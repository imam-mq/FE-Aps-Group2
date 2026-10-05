import z from "zod";
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Nama Wajib Diisi"),
    username: z.string().trim().min(3, "Username minimal 3 karakter"),
    email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid"),
    password: z
    .string()
    .min(1, "Password wajib diisi")
    .regex(PASSWORD_REGEX, "Password minimal 8 karakter serta kombinasi dengan angka"),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .regex(PASSWORD_REGEX, "Password minimal 8 karakter serta kombinasi dengan angka"),
});