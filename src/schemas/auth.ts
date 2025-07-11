import { z } from 'zod';

const passwordValidation = z.string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  .regex(/\d/, 'A senha deve conter pelo menos um número');

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: passwordValidation,
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  password: passwordValidation,
  confirmPassword: passwordValidation,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
}); 