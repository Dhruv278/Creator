import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import ModelProvider from "@/components/ModelProvider";
import ToastProvider from "@/components/ToastProvider";
import CrispProvider from "@/components/CrispProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creator",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>

    //   <html lang="en">
    //     <head>

    //   <link rel="icon" href="/logo.png" sizes="any" />
    //     </head>
    //     <CrispProvider />
    //     <body className={inter.className}>

    //       <ModelProvider />
    //       <ToastProvider />
    //       {children}
    //       </body>
    //   </html>
    // </ClerkProvider>
    <div>
      Hello
    </div>
  );
}
