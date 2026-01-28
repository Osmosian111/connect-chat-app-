import type { Metadata } from "next";
import "./globals.css";

import dotenv from "dotenv"
import path from "path";

dotenv.config({path:path.resolve(__dirname,"../../../.env")});

export const metadata: Metadata = {
  title: "Chat App",
  description: "Connect the world in eaiser way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
