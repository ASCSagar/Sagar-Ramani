"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";

import { MagneticButton } from "@/components/animations/magnetic-button";
import { useAnimationSettings } from "@/components/providers/animation-provider";
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
import { MOTION_EASES } from "@/config/motion";
import {
  contactSchema,
  enquiryPurposes,
  type ContactFormValues,
} from "@/lib/validations/contact";

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus | null>(null);
  const [lastSubmittedKey, setLastSubmittedKey] = useState<string | null>(null);
  const { shouldReduceMotion } = useAnimationSettings();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      purpose: enquiryPurposes[0],
      message: "",
      website: "",
      turnstileToken: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Prevent immediate duplicate submission of identical content
    const submissionKey = `${values.email}:${values.purpose}:${values.message.trim()}`;
    if (lastSubmittedKey === submissionKey) {
      setStatus({
        type: "error",
        message: "You have already submitted this message. To send an update, please modify your text.",
      });
      return;
    }

    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data.error ||
            "Unable to deliver your message right now. Please wait a moment to retry, or reach out directly via LinkedIn.",
        });
        return;
      }

      setLastSubmittedKey(submissionKey);
      setStatus({
        type: "success",
        message: data.message || "Thank you for getting in touch. Your message has been received.",
      });
      reset();
    } catch {
      setStatus({
        type: "error",
        message: "Network connection error while sending your message. Please check your connection and try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form" className="space-y-5">
      {/* Honeypot field hidden from human users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="transition-colors focus-visible:border-primary"
            {...register("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="transition-colors focus-visible:border-primary"
            {...register("email")}
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-company">Company (Optional)</Label>
          <Input
            id="contact-company"
            placeholder="Organization or team"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            className="transition-colors focus-visible:border-primary"
            {...register("company")}
          />
          {errors.company ? (
            <p id="contact-company-error" role="alert" className="text-xs text-destructive">
              {errors.company.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-purpose">Enquiry Purpose</Label>
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="contact-purpose"
                  className="w-full transition-colors"
                  aria-invalid={Boolean(errors.purpose)}
                  aria-describedby={errors.purpose ? "contact-purpose-error" : undefined}
                >
                  <SelectValue placeholder="Select a purpose" />
                </SelectTrigger>
                <SelectContent>
                  {enquiryPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purpose ? (
            <p id="contact-purpose-error" role="alert" className="text-xs text-destructive">
              {errors.purpose.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Share a brief overview of your project, role, or engineering goals."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="transition-colors focus-visible:border-primary"
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {status ? (
            <motion.div
              key={`${status.type}-${status.message}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: MOTION_EASES.framer.out }}
              role={status.type === "error" ? "alert" : "status"}
              className={
                status.type === "success"
                  ? "flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-foreground"
                  : "flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
              }
            >
              {status.type === "success" ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              )}
              <span>{status.message}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <MagneticButton className="w-full sm:w-auto">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </MagneticButton>
    </form>
  );
}
