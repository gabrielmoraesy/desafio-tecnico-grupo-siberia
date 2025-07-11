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
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

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
    <form data-login-form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-dark mb-1">Entrar</h2>
        <p className="text-gray-500 text-sm">Non sit purus tempus malesuada poten</p>
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="e-mail@website.com"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div>
        <Label className="block mb-1 text-dark font-medium text-sm">Senha</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="min. 8 caracteres"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm min-h-[51px]"
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <div className="flex items-center justify-between py-2">
        <Label className="flex items-center gap-2 text-gray-700 text-xs select-none font-medium">
          <Checkbox
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked as boolean)}
            className="w-4 h-4"
          />
          Lembrar
        </Label>
        <a href="#" className="text-primary text-xs font-medium hover:underline">Esqueceu a senha?</a>
      </div>

      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-dark text-white font-semibold rounded-lg py-3 transition disabled:opacity-60 text-sm min-h-[51px]"
        disabled={isSubmitting}
      >
        Entrar
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition text-sm min-h-[51px]"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <Image src={LogoGoogle} alt="Google" width={18} height={18} />
        Entrar com o Google
      </Button>

      <div className="text-center text-xs text-dark pt-2 font-medium">
        Ainda não tem conta? <button type="button" onClick={() => onSwitchTab?.("register")} className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer">Assine agora</button>
      </div>
    </form>
  );
} 