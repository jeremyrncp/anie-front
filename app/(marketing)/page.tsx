import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[350px] h-[350px] lg:w-[424px] lg:h-[424px] mb-24 lg:mb-0">
        <div className="map-container w-full h-full overflow-hidden rounded-3xl">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1Kh9QZZK9SULAErNRFnVB_aikKI0k4wc&ehbc=2E312F&noprof=1&ll=2.0,17.0&z=3"
            allowFullScreen
            className="w-full h-[calc(100%+80px)] relative -top-11 -bottom-0"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Welcome to Dazagara !
        </h1>
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master African languages.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" forceRedirectUrl="/learn">
                <Button size="lg" variant="secondary" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl="/learn">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
