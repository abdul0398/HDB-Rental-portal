import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HDB URA DATA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <body className={lato.className}>{children}</body>
      </Suspense>
    </html>
  );
}
