"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { profile } from "@/data/portfolio";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setNotice(false);
  };

  const validate = () => {
    const nextErrors: Errors = {};
    if (fields.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (fields.subject.trim().length < 3) nextErrors.subject = "Please add a short subject.";
    if (fields.message.trim().length < 15) nextErrors.message = "Please provide at least 15 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`${fields.subject.trim()} — portfolio enquiry`);
    const body = encodeURIComponent(`Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`);
    setNotice(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" value={fields.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" value={fields.subject} onChange={(event) => update("subject", event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />
        {errors.subject && <span id="subject-error" className="field-error">{errors.subject}</span>}
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} value={fields.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
      </div>
      <button className="button button-primary submit-button" type="submit">
        Prepare email <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <p className="form-note">This form opens your email app. It does not transmit or store your message on this website.</p>
      {notice && (
        <p className="form-success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" /> Your email app was opened. Review your message there before sending.
        </p>
      )}
    </form>
  );
}
