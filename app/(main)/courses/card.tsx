import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  active,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-3xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="w-full flex items-center justify-end">
        <div className="rounded-full bg-green-200 flex items-center justify-center p-1.5"
          style={{ visibility: active ? 'visible' : 'hidden' }}>
          <Check className="text-white stroke-[4] h-4 w-4" />
        </div>
      </div>
      <div className="flex justify-center items-center" style={{ height: '100px', width: '100px' }}>
        <Image
          src={imageSrc}
          alt={title}
          height={70}
          width={93.33}
          className="rounded-2xl drop-shadow-md border object-cover"
        />
      </div>
      <p className="text-neutral-700 text-center font-bold mt-3">
        {title}
      </p>
    </div>
  );
};
