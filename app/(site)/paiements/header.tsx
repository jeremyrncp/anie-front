import Image from "next/image";
import { Loader, MapPin, Phone, Mail, Briefcase } from "lucide-react";
import { 
  ClerkLoaded, 
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-[#0F172A] text-white">
      {/* Barre d'informations */}
      <div className="py-2 px-4 flex items-center justify-center lg:justify-between lg:max-w-screen-lg mx-auto">
        <div className="flex items-center justify-center gap-x-6 text-sm">
          <div className="flex items-center gap-x-2">
            <MapPin className="text-orange-500" size={18} />
            <span>N'Djamena - TCHAD</span>
          </div>
          <span className="hidden lg:block">|</span>
          <div className="flex items-center gap-x-2">
            <Phone className="text-orange-500" size={18} />
            <span>+235 22 22 52 35</span>
          </div>
          <span className="hidden lg:block">|</span>
          <div className="flex items-center gap-x-2">
            <Mail className="text-orange-500" size={18} />
            <span>Contact@anie.td</span>
          </div>
          <span className="hidden lg:block">|</span>
          <div className="flex items-center gap-x-2">
            <Briefcase className="text-orange-500" size={18} />
            <span>Lun - Ven : 7:30 - 15:30</span>
          </div>
        </div>
      </div>

      {/* Barre de navigation */}
      <div className="bg-white h-20 w-full border-b-2 border-slate-200 px-4">
        <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/anie_SIR.jpg" height={50} width={100} alt="Logo" />
            <h1 className="text-2xl font-bold text-black tracking-wide">
              Guichet Unique
            </h1>
          </div>

          {/* Chargement Clerk */}
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          {/* Authentification Clerk */}
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/infos">
                <Button size="lg" variant="ghost">
                  Connexion
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
