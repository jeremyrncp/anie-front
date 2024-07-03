import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/SwahiliFlag.jpg" 
            alt="Swahili" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Swahili
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/YorubaFlag.png" 
            alt="Yoruba" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Yoruba
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/AmharicFlag.png" 
            alt="Amharic" 
            height={40} 
            width={50}
            className="mr-4 rounded-md"
          />
          Amharic
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/IgboFlag.png" 
            alt="Igbo" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          Igbo
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image 
            src="/ThreeDots.jpg" 
            alt="ThreeDots" 
            height={32} 
            width={40}
            className="mr-4 rounded-md"
          />
          And many more
        </Button>
      </div>
    </footer>
  );
};
