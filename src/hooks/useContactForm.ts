"use client";

import { useState, useCallback } from "react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { contactInfo } from "@/data/social";

interface FieldErrors {
  [key: string]: string;
}

interface UseContactFormReturn {
  values: ContactFormValues;
  errors: FieldErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm(): UseContactFormReturn {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSuccess(false);

      // Client-side validation
      const result = contactFormSchema.safeParse(values);
      if (!result.success) {
        const fieldErrors: FieldErrors = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      setErrors({});

      try {
        // Static export: use mailto instead of API route
        const body = `From: ${values.name} (${values.email})\n\n${values.message}`;
        const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;

        // Brief delay for UX feedback
        await new Promise((r) => setTimeout(r, 300));

        // Open email client
        window.open(mailto, "_blank");

        setIsSuccess(true);
        setValues(initialValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSuccess(false);
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    reset,
  };
}
