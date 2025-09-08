import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SponsorSlotProps {
  id: number;
  sponsor?: {
    name: string;
    logo: string;
  };
  isActive?: boolean;
  delay?: number;
}

export const SponsorSlot = ({ id, sponsor, isActive, delay = 0 }: SponsorSlotProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    // Random spinning activation with delay
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) { // 30% chance to start spinning
        setIsSpinning(true);
        
        // Stop spinning after random duration
        setTimeout(() => {
          setIsSpinning(false);
        }, 2000 + Math.random() * 3000);
      }
    }, delay);

    // Periodic reactivation
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && !isSpinning) { // 20% chance every interval
        setIsSpinning(true);
        setTimeout(() => {
          setIsSpinning(false);
        }, 1000 + Math.random() * 2000);
      }
    }, 5000 + Math.random() * 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [delay, isSpinning]);

  return (
    <div
      className={cn(
        "sponsor-slot group h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32",
        "flex items-center justify-center cursor-pointer",
        "transition-all duration-500 ease-out",
        "hover:shadow-lg hover:shadow-gold/30",
        isSpinning && "spinning",
        isActive && "animate-gold-pulse"
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {sponsor ? (
        <div className="flex flex-col items-center justify-center h-full w-full p-2">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-w-full max-h-full object-contain filter drop-shadow-sm"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          <div className="text-slot-text text-xs md:text-sm font-medium opacity-80">
            Slot
          </div>
          <div className="text-gold text-xs md:text-sm font-bold mt-1">
            {id.toString().padStart(2, '0')}
          </div>
        </div>
      )}
      
      {/* Hologram Effect Layer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* AR Indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
      )}
    </div>
  );
};