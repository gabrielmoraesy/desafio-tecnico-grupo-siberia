import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import SessionProvider from '../providers/SessionProvider';
import { Toaster } from "react-hot-toast";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tamo Junto - Autenticação",
  description: "Sistema de autenticação seguro e responsivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} antialiased font-sans`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster position="top-center" toastOptions={{
          style: { fontSize: 16, borderRadius: 12, fontWeight: 500 }
        }} />
      </body>
    </html>
  );
}
