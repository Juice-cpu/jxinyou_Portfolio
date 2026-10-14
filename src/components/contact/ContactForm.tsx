"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactForm() {
  const {
    values,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-4"
    >
      <TextInput
        label="Name / 姓名"
        name="name"
        placeholder="你的名字"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <TextInput
        label="Email / 邮箱"
        name="email"
        type="email"
        placeholder="your@email.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <TextInput
        label="Subject / 主题"
        name="subject"
        placeholder="留言主题"
        value={values.subject}
        onChange={handleChange}
        error={errors.subject}
        required
      />

      <TextInput
        label="Message / 留言"
        name="message"
        type="textarea"
        placeholder="写下你想说的话..."
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        required
      />

      {errors.form && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        icon={isSuccess ? CheckCircle2 : Send}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "打开邮箱中..." : isSuccess ? "邮箱已打开！" : "发送留言"}
      </Button>
    </motion.form>
  );
}
