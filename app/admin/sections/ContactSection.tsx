import { Field } from "../components/Field";
import { DEFAULTS } from "../types";

type Contact = typeof DEFAULTS.contact;

export function ContactSection({ contact, setContact }: { contact: Contact; setContact: React.Dispatch<React.SetStateAction<Contact>> }) {
  return (
    <div className="space-y-4">
      <Field label="Email" value={contact.email} onChange={v => setContact(c => ({ ...c, email: v }))} />
      <Field label="GitHub URL" value={contact.github} onChange={v => setContact(c => ({ ...c, github: v }))} />
      <Field label="LinkedIn URL" value={contact.linkedin} onChange={v => setContact(c => ({ ...c, linkedin: v }))} />
      <Field label="Contact blurb (your voice — empty = hidden)" value={contact.blurb} onChange={v => setContact(c => ({ ...c, blurb: v }))} textarea />
    </div>
  );
}
