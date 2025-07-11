"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

export default function TabsAuth() {
  const [activeTab, setActiveTab] = useState("login");

  const switchToTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
      <TabsList className="w-[50%] flex justify-center grid-cols-2 bg-[#F5F7FD] rounded-[18px] p-1 mb-6">
        <TabsTrigger
          value="login"
          className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 bg-[#F5F7FD] rounded-[18px] text-base font-semibold transition-colors"
        >
          Entrar
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 bg-[#F5F7FD] rounded-[18px] text-base font-semibold transition-colors"
        >
          Cadastrar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm onSwitchTab={switchToTab} />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm onSwitchTab={switchToTab} />
      </TabsContent>
    </Tabs>
  );
} 