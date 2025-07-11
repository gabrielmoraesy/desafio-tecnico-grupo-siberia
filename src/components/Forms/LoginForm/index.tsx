"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../../../schemas/auth';
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import LogoGoogle from '../../../assets/logo-google.png';

interface LoginFormProps {
  onSwitchTab?: (tab: string) => void;
}

export default function LoginForm({ onSwitchTab }: LoginFormProps) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [remember, setRemember] = useState(true);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setError("");
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res?.error) {
      setError("Email ou senha inválidos");
      toast.error("Email ou senha inválidos");
    }
    if (res?.ok) window.location.href = "/dashboard";
  };

  return (
    <form data-login-form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Entrar</h2>
      <p className="text-gray-500 mb-4">Non sit purus tempus malesuada poten</p>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Email</label>
        <input type="email" {...register("email")}
          placeholder="e-mail@website.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Senha</label>
        <input type="password" {...register("password")}
          placeholder="min. 8 caracteres"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-gray-700 text-sm select-none">
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="accent-primary w-4 h-4 rounded" />
          Lembrar
        </label>
        <a href="#" className="text-primary text-sm font-medium hover:underline">Esqueceu a senha?</a>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button type="submit" className="w-full bg-primary hover:bg-dark text-white font-semibold rounded-lg py-3 transition disabled:opacity-60" disabled={isSubmitting}>
        Entrar
      </button>
      <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        <Image src={LogoGoogle} alt="Google" width={20} height={20} />
        Entrar com o Google
      </button>
      <div className="text-center text-sm text-gray-700 mt-2">
        Ainda não tem conta? <button type="button" onClick={() => onSwitchTab?.("register")} className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer">Assine agora</button>
      </div>
    </form>
  );
} 