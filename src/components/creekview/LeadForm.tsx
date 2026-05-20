import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UNITS, unitSelectLabel } from "@/data/creekview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, PhoneCall, FileText, Sparkles } from "lucide-react";

type Interest = "more_info" | "eoi" | "call_back";

const TIME_SLOTS = [
  "10:00 – 12:00",
  "12:00 – 14:00",
  "14:00 – 16:00",
  "16:00 – 18:00",
  "18:00 – 20:00",
];

const baseSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(32),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  preferred_unit: z.string().optional(),
  notes: z.string().max(2000).optional(),
  whatsapp_number: z.string().trim().max(32).optional().or(z.literal("")),
  preferred_call_date: z.string().optional(),
  preferred_call_time: z.string().optional(),
});

const INTERESTS: { id: Interest; label: string; sub: string; icon: React.ElementType }[] = [
  {
    id: "more_info",
    label: "I want more info",
    sub: "Brochure & details on WhatsApp",
    icon: FileText,
  },
  {
    id: "call_back",
    label: "Schedule a call",
    sub: "Pick a date and time that works",
    icon: PhoneCall,
  },
  { id: "eoi", label: "I'm ready for an EOI", sub: "Reserve your unit now", icon: Sparkles },
];

export function LeadForm({
  presetUnit,
  presetInterest,
}: {
  presetUnit?: string;
  presetInterest?: Interest;
}) {
  const [interest, setInterest] = useState<Interest>(presetInterest ?? "more_info");
  const [unit, setUnit] = useState<string>(presetUnit ?? "");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (presetInterest) setInterest(presetInterest);
  }, [presetInterest]);

  useEffect(() => {
    if (presetUnit !== undefined) setUnit(presetUnit ?? "");
  }, [presetUnit]);

  const ctaCopy = useMemo(() => {
    if (interest === "eoi") return "Send EOI request";
    if (interest === "call_back") return "Send call request";
    return "Send my request";
  }, [interest]);

  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = baseSchema.safeParse({
      full_name: fd.get("full_name"),
      phone: fd.get("phone"),
      email: fd.get("email") || undefined,
      preferred_unit: unit || undefined,
      notes: fd.get("notes") || undefined,
      whatsapp_number: fd.get("whatsapp_number") || undefined,
      preferred_call_date: fd.get("preferred_call_date") || undefined,
      preferred_call_time: fd.get("preferred_call_time") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    // Interest-specific required fields
    if (interest === "more_info" && !parsed.data.whatsapp_number) {
      toast.error("Please add your WhatsApp number so we can send the brochure.");
      return;
    }
    if (
      interest === "call_back" &&
      (!parsed.data.preferred_call_date || !parsed.data.preferred_call_time)
    ) {
      toast.error("Please choose a preferred call date and time.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      interest_type: interest,
      preferred_unit: unit || null,
      notes: parsed.data.notes || null,
      whatsapp_number: parsed.data.whatsapp_number || null,
      preferred_call_date: parsed.data.preferred_call_date || null,
      preferred_call_time: parsed.data.preferred_call_time || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
    toast.success("We received your request. Our team will be in touch shortly.");
  }

  if (done) {
    const msg =
      interest === "eoi"
        ? "Your EOI request is in. A senior advisor will call you within 24 hours to prepare the paperwork."
        : interest === "call_back"
          ? "Your call is scheduled. We'll reach out at your preferred time with all the details."
          : "Your details are on the way. Watch your WhatsApp for the full brochure and pricing.";
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-card sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold" strokeWidth={1.75} aria-hidden />
        <h3 className="mt-4 text-2xl sm:text-3xl font-display">Thank you</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">{msg}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-border/80 bg-card p-6 shadow-card sm:p-8"
    >
      <div>
        <h3 className="font-display text-2xl tracking-tight sm:text-[1.65rem]">
          Reserve your interest
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Tell us what you need — we&apos;ll route your request to the right team.
        </p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
        {INTERESTS.map(({ id, label, sub, icon: Icon }) => {
          const active = interest === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => setInterest(id)}
              className={`group rounded-xl border p-3.5 text-left transition-all sm:p-4 ${
                active
                  ? "border-gold/70 bg-gold/[0.09] shadow-card"
                  : "border-border/70 hover:border-primary/30 hover:bg-accent/40"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${active ? "text-gold" : "text-muted-foreground"}`}
                strokeWidth={2}
                aria-hidden
              />
              <div className="mt-2.5 text-sm font-medium leading-snug">{label}</div>
              <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{sub}</div>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full name *</Label>
          <Input id="full_name" name="full_name" required placeholder="Ahmed Hassan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" required placeholder="+20 1XX XXX XXXX" type="tel" />
        </div>

        {interest === "more_info" && (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="whatsapp_number">WhatsApp number *</Label>
            <Input
              id="whatsapp_number"
              name="whatsapp_number"
              required
              placeholder="+20 1XX XXX XXXX"
              type="tel"
            />
            <p className="text-[11px] text-muted-foreground">
              We'll send the brochure, floor plans and pricing here.
            </p>
          </div>
        )}

        {interest === "call_back" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="preferred_call_date">Preferred date *</Label>
              <Input
                id="preferred_call_date"
                name="preferred_call_date"
                type="date"
                min={today}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred_call_time">Preferred time *</Label>
              <select
                id="preferred_call_time"
                name="preferred_call_time"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Pick a slot
                </option>
                {TIME_SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email {interest === "eoi" ? "*" : "(optional)"}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required={interest === "eoi"}
            placeholder="you@email.com"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Preferred unit (optional)</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a unit type" />
            </SelectTrigger>
            <SelectContent>
              {UNITS.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {unitSelectLabel(u)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Anything else? (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Questions, timing, financing, etc."
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {ctaCopy}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        By submitting you agree to be contacted by Mountain View sales about CreekView New Cairo.
      </p>
    </form>
  );
}
