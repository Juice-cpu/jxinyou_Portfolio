import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "姓名至少需要 2 个字符").max(50),
  email: z.string().email("请输入有效的邮箱地址"),
  subject: z.string().min(2, "主题至少需要 2 个字符").max(100),
  message: z.string().min(10, "留言至少需要 10 个字符").max(1000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
