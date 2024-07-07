import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/db/schema";
import { Card } from "./card";
import { useState } from "react";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    if (disabled) return;
    if (type === "ORDER") {
      if (selectedOrder.includes(id)) return;
      const newOrder = [...selectedOrder, id];
      setSelectedOrder(newOrder);
      onSelect(id); // Notify parent about the selection
    } else {
      onSelect(id); // For other types, simply notify parent about the selection
    }
  };

  return (
    <div className={cn(
      "grid gap-2",
      type === "ASSIST" && "grid-cols-1",
      type === "SELECT" && (options.length === 1 ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"),
      type === "ORDER" && "grid-cols-4", // Adjust grid for ORDER type
      options.length === 1 && "justify-center items-center"
    )}>
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => handleSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};
