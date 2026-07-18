"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/forms/file-upload";

const PROJECT_TYPES = ["Residential", "Commercial", "Government", "Other"] as const;
const SERVICE_OPTIONS = ["Architecture", "Interiors", "Engineering", "Project Management", "Supervision"] as const;
const BUDGET_RANGES = ["Under $500K", "$500K – $1M", "$1M – $5M", "$5M – $20M", "Over $20M", "Prefer not to say"] as const;
const TIMELINE_OPTIONS = ["Immediately", "Within 3 months", "3 – 6 months", "6 – 12 months", "12+ months", "Prefer not to say"] as const;

const stepSchemas = [
  z.object({ projectType: z.string().min(1, "Select a project type") }),
  z.object({ services: z.array(z.string()).min(1, "Select at least one service") }),
  z.object({
    budgetRange: z.string().min(1, "Select a budget range"),
    timeline: z.string().min(1, "Select a timeline"),
  }),
  z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    country: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),
];

const STORAGE_KEY = "consultation-form";

type FormData = {
  projectType: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
};

const defaultValues: FormData = {
  projectType: "",
  services: [],
  budgetRange: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

export default function ConsultationStepper() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(stepSchemas[step] as never),
    defaultValues,
    mode: "onTouched",
  });

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>;
        (Object.keys(parsed) as (keyof FormData)[]).forEach((key) => {
          if (parsed[key] !== undefined) {
            setValue(key, parsed[key] as never);
          }
        });
      }
    } catch {
      // ignore
    }
  }, [setValue]);

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const goNext = useCallback(async () => {
    const valid = await trigger();
    if (!valid) return;
    setStep((s) => Math.min(s + 1, 3));
  }, [trigger]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setSubmitting(true);
      setError(null);
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
          } else {
            formData.append(key, String(value));
          }
        });
        uploadedFiles.forEach((file) => formData.append("files", file));

        const res = await fetch("/api/leads/consultation", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Submission failed");
        localStorage.removeItem(STORAGE_KEY);
        setSubmitted(true);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [uploadedFiles]
  );

  const toggleService = (service: string) => {
    const current = getValues("services");
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue("services", updated, { shouldValidate: true });
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 border border-accent rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
            <polyline points="8 14 12 18 20 10" />
          </svg>
        </div>
        <p className="font-display text-2xl text-charcoal mb-2">Thank you</p>
        <p className="text-muted text-sm">We will be in touch within 24 hours.</p>
      </div>
    );
  }

  const stepLabels = ["Project Type", "Services", "Budget", "Details"];

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {stepLabels.map((label, i) => (
            <span
              key={label}
              className={`text-xs uppercase tracking-widest transition-colors ${
                i <= step ? "text-charcoal" : "text-muted/40"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-px bg-border relative">
          <div
            className="absolute top-0 left-0 h-full bg-charcoal transition-all duration-500"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[320px]"
      >
        {/* Step 0: Project Type */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {PROJECT_TYPES.map((type) => (
              <label
                key={type}
                className={`flex items-center justify-center p-6 border cursor-pointer transition-all text-sm ${
                  watch("projectType") === type
                    ? "border-charcoal bg-charcoal text-offwhite"
                    : "border-border text-muted hover:border-charcoal"
                }`}
              >
                <input
                  type="radio"
                  value={type}
                  {...register("projectType")}
                  className="sr-only"
                />
                {type}
              </label>
            ))}
            {errors.projectType && (
              <p className="col-span-2 text-xs text-red-600">{errors.projectType.message}</p>
            )}
          </div>
        )}

        {/* Step 1: Services */}
        {step === 1 && (
          <div className="space-y-2">
            {SERVICE_OPTIONS.map((service) => {
              const checked = watch("services").includes(service);
              return (
                <label
                  key={service}
                  className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                    checked ? "border-charcoal bg-charcoal/5" : "border-border hover:border-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleService(service)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                      checked ? "bg-charcoal border-charcoal" : "border-border"
                    }`}
                  >
                    {checked && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${checked ? "text-charcoal" : "text-muted"}`}>
                    {service}
                  </span>
                </label>
              );
            })}
            {errors.services && (
              <p className="text-xs text-red-600">{errors.services.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Budget & Timeline */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">Budget Range</p>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_RANGES.map((range) => (
                  <label
                    key={range}
                    className={`flex items-center p-3 border cursor-pointer transition-all text-sm ${
                      watch("budgetRange") === range
                        ? "border-charcoal bg-charcoal text-offwhite"
                        : "border-border text-muted hover:border-charcoal"
                    }`}
                  >
                    <input
                      type="radio"
                      value={range}
                      {...register("budgetRange")}
                      className="sr-only"
                    />
                    {range}
                  </label>
                ))}
              </div>
              {errors.budgetRange && (
                <p className="text-xs text-red-600 mt-1">{errors.budgetRange.message}</p>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">Timeline</p>
              <div className="grid grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map((tl) => (
                  <label
                    key={tl}
                    className={`flex items-center p-3 border cursor-pointer transition-all text-sm ${
                      watch("timeline") === tl
                        ? "border-charcoal bg-charcoal text-offwhite"
                        : "border-border text-muted hover:border-charcoal"
                    }`}
                  >
                    <input
                      type="radio"
                      value={tl}
                      {...register("timeline")}
                      className="sr-only"
                    />
                    {tl}
                  </label>
                ))}
              </div>
              {errors.timeline && (
                <p className="text-xs text-red-600 mt-1">{errors.timeline.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="consult-name" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Name *
                </label>
                <input
                  id="consult-name"
                  type="text"
                  {...register("name")}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="consult-email" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Email *
                </label>
                <input
                  id="consult-email"
                  type="email"
                  {...register("email")}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="consult-phone" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Phone
                </label>
                <input
                  id="consult-phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
              </div>
              <div>
                <label htmlFor="consult-country" className="block text-xs uppercase tracking-widest text-muted mb-2">
                  Country
                </label>
                <input
                  id="consult-country"
                  type="text"
                  {...register("country")}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="consult-message" className="block text-xs uppercase tracking-widest text-muted mb-2">
                Message *
              </label>
              <textarea
                id="consult-message"
                rows={3}
                {...register("message")}
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-border text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors resize-none"
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Attachments</p>
              <FileUpload onFilesChange={setUploadedFiles} maxFiles={3} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="text-xs uppercase tracking-widest text-muted hover:text-charcoal transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="px-8 py-3 bg-charcoal text-offwhite text-xs uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-charcoal text-offwhite text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-4 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
