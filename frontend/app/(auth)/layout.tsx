"use client";

import "@/app/globals.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Lottie Chatbot */}
      <div className="w-1/3 flex items-center justify-center p-8">
        <DotLottieReact
          src="https://lottie.host/4464e337-2ebc-45ea-ac1b-e7f49f9b2cdf/Js5mx1NzN2.lottie"
          loop
          autoplay
          style={{ width: "80%", height: "80%" }}
        />
      </div>

      {/* Right side - Auth Form */}
      <div className="w-2/3 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">{children}</div>
      </div>
    </div>
  );
}
