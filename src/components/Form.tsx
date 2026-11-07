"use client";
import { useState } from "react";
import { contact } from "@/data/contact";
export default function Form() {
  const [st, setSt] = useState("");
  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget, d = new FormData(f);
    if (!contact.formspree) {
      location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Message from " + d.get("name"))}&body=${encodeURIComponent(String(d.get("message")))}`;
      return;
    }
    setSt("Sending...");
    try {
      const r = await fetch(contact.formspree, { method: "POST", body: d, headers: { Accept: "application/json" } });
      if (r.ok) { setSt("Message sent. I will reply soon."); f.reset(); } else setSt("Could not send. Please email me directly.");
    } catch { setSt("Could not send. Please email me directly."); }
  }
  return (
    <form onSubmit={send} className="form">
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Tell me about your project" rows={4} required />
      <button type="submit">Send message</button>
      <p role="status">{st}</p>
    </form>
  );
}
