import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/clinic";

export function AppointmentForm() {
  const [service, setService] = useState("");

  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Request received", {
          description: "Our team will confirm your appointment slot shortly.",
        });
        (e.target as HTMLFormElement).reset();
        setService("");
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" required placeholder="Your name" className="h-12 rounded-xl" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+91 00000 00000"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          className="h-12 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date">Preferred date</Label>
        <Input id="date" name="date" type="date" className="h-12 rounded-xl" />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="service">Service required</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" className="h-12 rounded-xl">
            <SelectValue placeholder="Choose a programme" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.title} value={s.title}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message">Tell us briefly about your concern</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Symptoms, duration, current medication…"
          className="rounded-xl"
        />
      </div>
      <Button type="submit" variant="hero" size="pill" className="sm:col-span-2">
        Request Appointment
      </Button>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        We respond within one working day. Your details stay confidential.
      </p>
    </form>
  );
}