"use client";

import "@/app/globals.css";
import Chatbot from "@/components/chatbot/ChatBox";
import FloatingChatbot from "@/components/chatbot/FLoatingButton";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        <main className="flex-1 overflow-y-auto pl-60">{children}</main>
        <FloatingChatbot/>
      </div>
    </>
  );
}
