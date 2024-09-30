import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SkillForge - Resume Builder",
  description: "A.I based resume builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      variables: {
        colorText: "#fff",
        colorPrimary: "#057EC2",
        colorBackground: "#03315C",
        colorInputBackground: "#252A41",
        colorInputText: "#fff",
      },
    }}
    >
      <html lang="en">
        <body
          className={'antialiased'}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
