"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    if (data.honeypot) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-4 border border-accent rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <polyline points="6 10 9 13 14 7" />
          </svg>
        </div>
        <p className="font-display text-xl text-charcoal mb-1">Message sent</p>
        <p className="text-sm text-muted">We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="hp-contact">Leave blank</label>
        <input id="hp-contact" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-muted mb-2">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          {...register("name")}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
          placeholder="Your name"
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-muted mb-2">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-muted mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          {...register("message")}
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors resize-none"
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-charcoal text-offwhite text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
