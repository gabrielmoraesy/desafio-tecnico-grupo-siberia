"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '../../../schemas/auth';
import { z } from "zod";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Check } from "lucide-react";
import LogoGoogle from '../../../assets/logo-google.png';

type RegisterFormType = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchTab?: (tab: string) => void;
}

export default function RegisterForm({ onSwitchTab }: RegisterFormProps) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const hasMinLength = (watchPassword || "").length >= 8;
  const hasUpperCase = /[A-Z]/.test(watchPassword || "");
  const hasNumber = /\d/.test(watchPassword || "");
  const passwordsMatch = watchPassword && watchConfirmPassword && watchPassword === watchConfirmPassword;

  const validationRules = [
    { id: 'minLength', condition: hasMinLength, text: 'Senha ter no mínimo 8 caracteres' },
    { id: 'upperCase', condition: hasUpperCase, text: 'Pelo menos uma letra maiúscula' },
    { id: 'number', condition: hasNumber, text: 'Pelo menos um número' },
    { id: 'match', condition: passwordsMatch, text: 'Senhas coincidem' }
  ];

  const renderValidationRule = (rule: { condition: boolean; text: string }) => (
    <div key={rule.text} className={`text-xs flex items-center gap-2 ${rule.condition ? 'text-green-600' : 'text-gray-500'}`}>
      <div className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border-2 ${rule.condition ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
        {rule.condition && (
          <Check size={10} className="text-white" />
        )}
      </div>
      {rule.text}
    </div>
  );

  const onSubmit = async (data: RegisterFormType) => {
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (res.ok) {
      toast.success("Conta criada com sucesso! Iremos logar para você...");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard"
      });
      reset();
    } else {
      const json = await res.json();
      setError(json.message || "Erro ao cadastrar");
      toast.error(json.message || "Erro ao cadastrar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Cadastrar</h2>

      {/* Password validation indicators */}
      <div className="space-y-1.5 mb-4">
        {validationRules.map(renderValidationRule)}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Nome</label>
        <input type="text" {...register("name")}
          placeholder="Seu nome completo"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Email</label>
        <input type="email" {...register("email")}
          placeholder="e-mail@website.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Senha</label>
        <input type="password" {...register("password")}
          placeholder="min. 8 caracteres"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Confirmar senha</label>
        <input type="password" {...register("confirmPassword")}
          placeholder="Repita sua senha"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button type="submit" className="w-full bg-primary hover:bg-dark text-white font-semibold rounded-lg py-2.5 transition disabled:opacity-60" disabled={isSubmitting}>
        Cadastrar
      </button>
      <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition" onClick={() => window.location.href = '/login'}>
        <Image src={LogoGoogle} alt="Google" width={20} height={20} />
        Entrar com o Google
      </button>
      <div className="text-center text-sm text-gray-700 mt-1">
        Já tem conta? <button type="button" onClick={() => onSwitchTab?.("login")} className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer">Entrar</button>
      </div>
    </form>
  );
} 