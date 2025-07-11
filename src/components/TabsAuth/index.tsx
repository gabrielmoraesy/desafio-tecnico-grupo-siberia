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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full md:w-64 flex justify-center grid-cols-2 bg-[#F5F7FD] rounded-[18px] p-1 mb-4 mx-auto md:mx-0">
        <TabsTrigger
          value="login"
          className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 bg-[#F5F7FD] rounded-[18px] text-xs font-semibold transition-colors text-[#697889]"
        >
          Entrar
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 bg-[#F5F7FD] rounded-[18px] text-xs font-semibold transition-colors text-[#697889]"
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