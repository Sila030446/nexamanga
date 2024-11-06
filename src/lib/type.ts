import z from "zod";

export type FormState = {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 2 ตัวอักษร",
    })
    .trim(),
  email: z
    .string()
    .email({ message: "โปรดใส่อีเมลที่ถูกต้อง" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" })
    .regex(/[a-zA-Z]/, {
      message: "รหัสผ่านต้องมีตัวอักษรอย่างน้อยหนึ่งตัว",
    })
    .regex(/[0-9]/, {
      message: "รหัสผ่านต้องมีตัวเลขอย่างน้อยหนึ่งตัว",
    })
    .trim(),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "โปรดใส่อีเมลที่ถูกต้อง" })
    .toLowerCase()
    .trim(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" })
      .regex(/[a-zA-Z]/, {
        message: "รหัสผ่านต้องมีตัวอักษรอย่างน้อยหนึ่งตัว",
      })
      .regex(/[0-9]/, {
        message: "รหัสผ่านต้องมีตัวเลขอย่างน้อยหนึ่งตัว",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });
