import { Loader, ArrowRight, FileText, UserPlus, Shield, Calculator, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
      
      {/* Section d'Informations (Cartes) */}
      <div className="flex flex-col gap-y-4">
      </div>

      {/* Section d'Accueil */}
      <div className="flex flex-col items-center justify-end gap-y-8">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-600 max-w-[480px] text-center">
          Bienvenue au Guichet Unique
        </h1>
        <h1 className="text-xl lg:text-xl text-neutral-600 max-w-[480px] text-center">
          Créez votre entreprise en ligne.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
        </div>
      </div>
    </div>
  );
}

