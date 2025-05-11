import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";


const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Créez votre activité en ligne | Guichet Unique",
  description: "Effectuez et suivez vos démarches en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal/>
          <PracticeModal/>
          {children}
        </body>
      </html>
  );
}
