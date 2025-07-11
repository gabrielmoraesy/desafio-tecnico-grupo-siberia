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
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

type RegisterFormType = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchTab?: (tab: string) => void;
}

export default function RegisterForm({ onSwitchTab }: RegisterFormProps) {
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
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
    <div key={rule.text} className={`text-xs flex items-center gap-1.5 ${rule.condition ? 'text-green-600' : 'text-gray-500'}`}>
      <div className={`flex items-center justify-center w-3 h-3 rounded-full border-2 ${rule.condition ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
        {rule.condition && (
          <Check size={8} className="text-white" />
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-1">Cadastrar</h2>
      </div>

      <div className="space-y-1 mb-3">
        {validationRules.map(renderValidationRule)}
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Nome</Label>
        <Input
          type="text"
          {...register("name")}
          placeholder="Seu nome completo"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="e-mail@website.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Senha</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="min. 8 caracteres"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Confirmar senha</Label>
        <Input
          type="password"
          {...register("confirmPassword")}
          placeholder="Repita sua senha"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
      </div>

      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

      <div className="flex items-center gap-2 py-2">
        <Checkbox
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          className="w-4 h-4"
        />
        <Label className="text-xs text-dark select-none font-medium">
          Concordo com os <a href="#" className="text-primary font-semibold hover:underline">Termos e Condições</a>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-dark text-white font-semibold rounded-lg py-2.5 transition disabled:opacity-60 text-sm min-h-[51px]"
        disabled={isSubmitting || !acceptTerms}
      >
        Cadastrar
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition text-sm min-h-[51px]"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <Image src={LogoGoogle} alt="Google" width={18} height={18} />
        Entrar com o Google
      </Button>

      <div className="text-center text-xs text-dark pt-1 font-medium">
        Já tem conta? <button type="button" onClick={() => onSwitchTab?.("login")} className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer">Entrar</button>
      </div>
    </form>
  );
} 