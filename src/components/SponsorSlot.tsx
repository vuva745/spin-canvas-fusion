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
  mode?: 'static' | 'hologram' | 'ar' | 'spinning';
}

export const SponsorSlot = ({ id, sponsor, isActive, delay = 0, mode = 'static' }: SponsorSlotProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (mode !== 'spinning') {
      setIsSpinning(false);
      return;
    }

    // Random spinning activation with delay (only for spinning mode)
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
  }, [delay, isSpinning, mode]);

  const getModeStyles = () => {
    switch (mode) {
      case 'hologram':
        return {
          className: "border-blue-400/60 bg-gradient-to-br from-blue-500/10 to-purple-500/10",
          glow: "shadow-blue-400/50",
        };
      case 'ar':
        return {
          className: "border-green-400/60 bg-gradient-to-br from-green-500/10 to-emerald-500/10",
          glow: "shadow-green-400/50",
        };
      case 'spinning':
        return {
          className: "border-gold/80 bg-gradient-to-br from-gold/10 to-gold-bright/10",
          glow: "shadow-gold/50",
        };
      default:
        return {
          className: "border-muted bg-gradient-to-br from-muted/50 to-muted/30",
          glow: "shadow-muted/30",
        };
    }
  };

  const modeStyles = getModeStyles();

  return (
    <div
      className={cn(
        "sponsor-slot group h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32",
        "flex items-center justify-center cursor-pointer",
        "transition-all duration-500 ease-out",
        "hover:shadow-lg hover:scale-105",
        modeStyles.className,
        isSpinning && mode === 'spinning' && "spinning",
        isActive && mode === 'hologram' && "animate-pulse",
        isActive && mode === 'ar' && "animate-bounce",
        isActive && mode === 'spinning' && "animate-gold-pulse",
        isActive && `hover:${modeStyles.glow}`
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
      
      {/* Mode-specific Effects */}
      {mode === 'hologram' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {mode === 'ar' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {mode === 'spinning' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {/* Active State Indicators */}
      {isActive && mode === 'hologram' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
      )}
      
      {isActive && mode === 'ar' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-bounce" />
      )}
      
      {isActive && mode === 'spinning' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
      )}
      
      {/* Layer-specific overlays */}
      {mode === 'hologram' && isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-xl pointer-events-none animate-pulse" />
      )}
      
      {mode === 'ar' && isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-xl pointer-events-none" />
      )}
    </div>
  );
};