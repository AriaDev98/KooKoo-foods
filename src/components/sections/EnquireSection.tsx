import { useState, type FormEvent } from "react";
import { MapPin } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { OCCASIONS, SITE } from "../../data/content";

interface FormState {
  name: string;
  contact: string;
  occasion: string;
  guests: string;
  date: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  contact: "",
  occasion: OCCASIONS[0],
  guests: "",
  date: "",
  notes: "",
};

export function EnquireSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState(`Or email ${SITE.email} directly.`);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const hasError = Object.values(errors).some(Boolean);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const guestsNum = Number(form.guests);
    const guestsMissing = !form.guests.trim();
    const guestsTooFew = !guestsMissing && guestsNum > 0 && guestsNum < 10;

    const missing: string[] = [];
    if (!form.name.trim()) missing.push("your name");
    if (!form.contact.trim()) missing.push("an email or phone number");
    if (guestsMissing) missing.push("the number of guests");

    if (missing.length || guestsTooFew) {
      setErrors({ name: !form.name.trim(), contact: !form.contact.trim(), guests: guestsMissing || guestsTooFew });
      setSent(false);
      setStatus(
        guestsTooFew
          ? `We cater from 10 guests up — for a smaller group, call us on ${SITE.phone} and we'll see what we can do.`
          : `Almost there — we still need ${missing.join(" and ")}.`,
      );
      return;
    }

    const body = [
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Occasion: ${form.occasion}`,
      `Guests: ${form.guests || "not sure yet"}`,
      `Date: ${form.date || "flexible"}`,
      "",
      form.notes,
    ].join("\n");

    window.location.href =
      `mailto:${SITE.email}?subject=` +
      encodeURIComponent(`Catering enquiry — ${form.occasion} — ${form.name}`) +
      "&body=" +
      encodeURIComponent(body);

    setErrors({});
    setSent(true);
    setStatus(
      `Thank you, ${form.name.trim().split(" ")[0]} — your email app is opening with everything filled in. Just press send, or call us on ${SITE.phone}.`,
    );
  };

  const statusClasses = sent
    ? "border-green-700 bg-sage-200 text-green-700"
    : hasError
      ? "border-clay-700 bg-[rgba(76,33,24,0.08)] text-clay-700"
      : "border-sage-300 bg-cream-200 text-green-700";

  return (
    <section
      id="enquire"
      className="bg-cream-100 border-t border-cream-400 px-6 sm:px-10 py-24"
    >
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <Reveal>
            <SectionHeading icon="mail" tone="amber">
              Book your event
            </SectionHeading>
            <h2 className="mt-6 mb-6 font-display text-h2 font-extrabold tracking-heading leading-snug text-green-800">
              Tell us what you are planning
            </h2>
          </Reveal>
          <p className="m-0 mb-10 font-body text-body-lg leading-relaxed text-green-700 max-w-[32em]">
            Send the date, the number of guests and any dietary needs. We reply with a spread and a
            price, usually the same day.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[34em]" noValidate>
            <Field label="Your name" required>
              <Input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Sara Ahmadi"
                invalid={!!errors.name}
              />
            </Field>
            <Field label="Email or phone" required>
              <Input
                value={form.contact}
                onChange={(e) => setField("contact", e.target.value)}
                placeholder="you@example.com"
                invalid={!!errors.contact}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Field label="Occasion">
                <Select
                  options={OCCASIONS}
                  value={form.occasion}
                  onChange={(e) => setField("occasion", e.target.value)}
                />
              </Field>
              <Field label="Guests" required hint="Minimum 10 guests">
                <Input
                  type="number"
                  min={10}
                  max={1000}
                  step={1}
                  inputMode="numeric"
                  value={form.guests}
                  onChange={(e) =>
                    setField("guests", e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "").slice(0, 4))
                  }
                  placeholder="40"
                  invalid={!!errors.guests}
                />
              </Field>
              <Field label="Date">
                <Input type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} />
              </Field>
            </div>
            <Field
              label="What are you after"
              hint="Dishes you have your eye on, dietary needs, suburb for delivery."
            >
              <Textarea
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                rows={4}
                placeholder="Nowruz lunch for 40 in Parramatta — two vegan guests."
              />
            </Field>
            <div className="flex flex-wrap gap-4 items-center">
              <Button type="submit" variant="primary" size="lg" premium>
                Send my enquiry
              </Button>
              <Button variant="outline" size="lg" href={SITE.phoneHref}>
                Call instead
              </Button>
            </div>
            <p role="status" className={`m-0 font-body text-body-md leading-normal px-5 py-4 border-l-4 ${statusClasses}`}>
              {!sent && !hasError ? (
                <>
                  Or email{" "}
                  <a href={`mailto:${SITE.email}`} className="link-underline font-bold text-green-800">
                    {SITE.email}
                  </a>{" "}
                  directly.
                </>
              ) : (
                status
              )}
            </p>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <Card tone="sage">
            <SectionHeading icon="mail" tone="green" color="green">
              Find us
            </SectionHeading>
            <div className="flex flex-col gap-5 mt-6 font-ui">
              <div>
                <div className="text-eyebrow font-bold tracking-eyebrow uppercase text-green-700">
                  Email
                </div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-body-lg font-extrabold text-green-800 no-underline"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <div className="text-eyebrow font-bold tracking-eyebrow uppercase text-green-700">
                  Phone
                </div>
                <a href={SITE.phoneHref} className="text-body-lg font-extrabold text-green-800 no-underline">
                  {SITE.phone}
                </a>
              </div>
              <div>
                <div className="text-eyebrow font-bold tracking-eyebrow uppercase text-green-700">
                  Kitchen
                </div>
                <div className="text-body-lg font-extrabold text-green-800 leading-snug">
                  {SITE.address.kitchen}
                  <br />
                  {SITE.address.line}
                  <br />
                  {SITE.address.region}
                </div>
              </div>
              <div>
                <div className="text-eyebrow font-bold tracking-eyebrow uppercase text-green-700">
                  We deliver
                </div>
                <div className="text-body-lg font-extrabold text-green-800">Across New South Wales</div>
              </div>
            </div>
          </Card>
          <div className="relative border-2 border-green-800 bg-sage-200 overflow-hidden">
            <iframe
              title="Map of 34 Crosgrove Rd, Strathfield South"
              src={SITE.mapEmbedUrl}
              className="w-full h-[300px] border-0 block"
              style={{ filter: "grayscale(1) sepia(.5) saturate(.4) contrast(1.1)" }}
              loading="lazy"
            />
            <MapPin
              aria-hidden="true"
              size={40}
              strokeWidth={2.5}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-clay-700 fill-amber-500 pointer-events-none drop-shadow-[0_4px_6px_rgba(38,63,20,0.45)]"
            />
          </div>
          <Button variant="secondary" size="md" href={SITE.mapDirectionsUrl} fullWidth>
            Get directions
          </Button>
        </div>
      </div>
    </section>
  );
}
