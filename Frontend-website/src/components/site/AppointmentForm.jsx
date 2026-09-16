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
import { services } from "@/data/clinic";
import { cn } from "@/lib/utils";

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

export function AppointmentForm({ compact = false }) {
  const [service, setService] = useState("");

  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const phone = String(data.get("phone") || "").trim();
        if (!name || !phone) {
          toast.error("Almost there", {
            description: "Please add your name and phone number so we can confirm your slot.",
          });
          return;
        }
        toast.success("Request received", {
          description: `Thank you ${name.split(" ")[0]} — our care team will confirm your appointment slot shortly.`,
        });
        e.currentTarget.reset();
        setService("");
      }}
    >
      <Field label="Full name" htmlFor="name" required>
        <Input
          id="name"
          name="name"
          required
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
      <Field label="Preferred date" htmlFor="date">
        <Input id="date" name="date" type="date" className="field-premium h-13 px-4" />
      </Field>
      <Field label="Programme" htmlFor="service" className="sm:col-span-2">
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" className="field-premium h-13 px-4">
            <SelectValue placeholder="Choose a programme — or leave blank for guidance" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
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
      <div className="sm:col-span-2">
        <Button type="submit" variant="hero" size="pill" className="btn-arrow w-full sm:w-auto">
          Request Appointment <ArrowRight className="size-4" />
        </Button>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          We respond within one working day. Your details stay private and confidential.
        </p>
      </div>
    </form>
  );
}
