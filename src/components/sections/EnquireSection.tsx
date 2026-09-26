import { useState, type FormEvent } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { OCCASIONS, SITE } from "../../data/content";
import { useTable } from "../../context/TableContext";
import { isValidContact } from "../../utils/contact";
import { useHasMounted } from "../../hooks/useHasMounted";

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
  const { selected, remove } = useTable();
  const mounted = useHasMounted();
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
    const contact = form.contact.trim();
    const contactMissing = !contact;
    const contactInvalid = !contactMissing && !isValidContact(contact);

    const missing: string[] = [];
    if (!form.name.trim()) missing.push("your name");
    if (contactMissing) missing.push("an email or phone number");
    if (guestsMissing) missing.push("the number of guests");

    if (missing.length || guestsTooFew || contactInvalid) {
      setErrors({
        name: !form.name.trim(),
        contact: contactMissing || contactInvalid,
        guests: guestsMissing || guestsTooFew,
      });
      setSent(false);
      const problems: string[] = [];
      if (missing.length) problems.push(`we still need ${missing.join(" and ")}`);
      if (contactInvalid) problems.push("that email or phone number doesn't look right — please check it");
      setStatus(
        guestsTooFew
          ? `We cater from 10 guests up — for a smaller group, call us on ${SITE.phone} and we'll see what we can do.`
          : `Almost there — ${problems.join(", and ")}.`,
      );
      return;
    }

    const body = [
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Occasion: ${form.occasion}`,
      `Guests: ${form.guests || "not sure yet"}`,
      `Date: ${form.date || "flexible"}`,
      ...(selected.length ? ["", "Dishes I would like on my table:", ...selected.map((n) => `- ${n}`)] : []),
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
            <Field label="Email or phone" required hint="So we can reply to you">
              <Input
                value={form.contact}
                autoComplete="email"
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
            <div className="rounded-2xl border-2 border-dashed border-green-700 bg-cream-200 px-5 py-4">
              <div className="font-ui text-caption font-bold uppercase tracking-eyebrow text-green-600">
                Your table
              </div>
              {mounted && selected.length ? (
                <>
                  <ul className="m-0 mt-3 p-0 list-none flex flex-wrap gap-2">
                    {selected.map((name) => (
                      <li
                        key={name}
                        className="flex items-center gap-1 rounded-full bg-green-800 py-1 pl-4 pr-1 font-ui text-body-sm font-bold text-cream-100"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() => remove(name)}
                          aria-label={`Remove ${name}`}
                          className="grid h-6 w-6 place-items-center rounded-full text-cream-200 hover:bg-amber-500 hover:text-green-800 cursor-pointer"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="m-0 mt-3 font-body text-body-sm text-green-700">
                    These will be added to your enquiry.
                  </p>
                </>
              ) : (
                <p className="m-0 mt-2 font-body text-body-md text-green-700">
                  Nothing picked yet. Tap <b>Add to my table</b> on any dish in the{" "}
                  <a href="#menu" className="link-underline font-bold text-green-800">
                    menu
                  </a>{" "}
                  and it will appear here.
                </p>
              )}
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
              title="Map showing FoodLab at 34 Cosgrove Rd, Strathfield South"
              src={SITE.mapEmbedUrl}
              className="w-full h-[300px] border-0 block"
              style={{ filter: "grayscale(.55) sepia(.2) saturate(.75) contrast(1.05)" }}
              loading="lazy"
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
