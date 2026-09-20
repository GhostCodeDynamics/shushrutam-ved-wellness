import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createAppointment } from "@/lib/api";
import { useApiServices } from "@/lib/apiContent";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "Morning (9 am – 12 noon)",
  "Afternoon (12 noon – 3 pm)",
  "Evening (3 pm – 6 pm)",
];

function Field({ label, htmlFor, required, children, className }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={htmlFor} className="text-[0.82rem] font-bold tracking-wide text-ink">
        {label}{" "}
        {required && (
          <span aria-hidden className="text-brand">
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+?\d{1,3}[-.\s]?)?\(?\d{2,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{4,6}$/;

export function AppointmentForm({ compact = false }) {
  const services = useApiServices();
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") || "").trim()) return;

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "")
      .trim()
      .replace(/[^\d+]/g, "");
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name) {
      toast.error("Almost there", {
        description: "Please add your full name so we know who to contact.",
      });
      return;
    }
    if (!phone || !PHONE_RE.test(phone)) {
      toast.error("Check your phone number", {
        description: "Please enter a valid phone number so we can confirm your slot.",
      });
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      toast.error("Check your email", {
        description: "That email address doesn't look right — mind checking it?",
      });
      return;
    }
    if (!data.get("consent")) {
      toast.error("One last step", {
        description: "Please tick the consent box so we can contact you about this enquiry.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await createAppointment({
        name,
        phone,
        email: email || undefined,
        service: service && service !== "none" ? service : undefined,
        preferredDate: String(data.get("preferredDate") || "") || undefined,
        preferredTime: TIME_SLOTS.includes(time) ? time : undefined,
        message: message || undefined,
        consent: true,
      });
      toast.success("Request received", {
        description: `Thank you ${name.split(" ")[0]} — our care team will confirm your appointment slot shortly.`,
      });
      form.reset();
      setService("");
      setTime("");
    } catch (error) {
      toast.error("We couldn't send that", {
        description: error.message || "Please try again in a moment, or call us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
      <Field label="Full name" htmlFor="name" required>
        <Input
          id="name"
          name="name"
          required
          aria-required="true"
          autoComplete="name"
          placeholder="Your full name"
          className="field-premium h-13 px-4"
        />
      </Field>
      <Field label="Phone number" htmlFor="phone" required>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          aria-required="true"
          autoComplete="tel"
          placeholder="+91 00000 00000"
          className="field-premium h-13 px-4"
        />
      </Field>
      <Field label="Email (optional)" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          className="field-premium h-13 px-4"
        />
      </Field>
      <Field label="Preferred date" htmlFor="preferredDate">
        <Input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className="field-premium h-13 px-4"
        />
      </Field>
      <Field label="Preferred time" htmlFor="preferredTime" className="sm:col-span-2">
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger id="preferredTime" className="field-premium h-13 px-4">
            <SelectValue placeholder="Pick a time window — or leave blank" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            {TIME_SLOTS.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Programme" htmlFor="service" className="sm:col-span-2">
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" className="field-premium h-13 px-4">
            <SelectValue placeholder="Choose a programme — or leave blank for guidance" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectItem value="none">Not sure yet — guide me</SelectItem>
            {services.map((s) => (
              <SelectItem key={s.title} value={s.title}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      {!compact && (
        <Field label="Your concern" htmlFor="message" className="sm:col-span-2">
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Symptoms, duration, current medication…"
            className="field-premium min-h-28 px-4 py-3"
          />
        </Field>
      )}

      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto z-[-1] h-px w-px overflow-hidden"
      >
        <label htmlFor="company">Leave this field empty</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          type="text"
          className="-m-px h-px w-px"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 accent-brand"
          aria-required="true"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">
          I agree to be contacted by the clinic about this enquiry, and I have read the{" "}
          <a
            href="/privacy"
            className="font-semibold underline decoration-brand/40 underline-offset-2 transition-colors hover:text-brand"
          >
            privacy policy
          </a>
          .
        </span>
      </label>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="hero"
          size="pill"
          className="btn-arrow w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Request Appointment"}{" "}
          {!submitting && <ArrowRight className="size-4" />}
        </Button>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          We respond within one working day. Your details stay private and confidential.
        </p>
      </div>
    </form>
  );
}
