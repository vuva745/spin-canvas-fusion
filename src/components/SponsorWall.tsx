import { useState, useEffect } from "react";
import { SponsorSlot } from "./SponsorSlot";

// Mock sponsors data
const mockSponsors = [
  { id: 1, name: "TechCorp", logo: "/api/placeholder/80/80" },
  { id: 5, name: "InnovateCo", logo: "/api/placeholder/80/80" },
  { id: 12, name: "FutureTech", logo: "/api/placeholder/80/80" },
  { id: 18, name: "NexGen", logo: "/api/placeholder/80/80" },
];

export const SponsorWall = () => {
  const [activeSlots, setActiveSlots] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Randomly activate slots for AR effects
    const interval = setInterval(() => {
      const randomSlot = Math.floor(Math.random() * 24) + 1;
      setActiveSlots(prev => {
        const newSet = new Set(prev);
        if (newSet.has(randomSlot)) {
          newSet.delete(randomSlot);
        } else {
          newSet.add(randomSlot);
        }
        // Limit to max 3 active slots
        if (newSet.size > 3) {
          const firstActive = Array.from(newSet)[0];
          newSet.delete(firstActive);
        }
        return newSet;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSponsorForSlot = (slotId: number) => {
    return mockSponsors.find(sponsor => sponsor.id === slotId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="sponsor-wall-title text-3xl md:text-4xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
          5D SPONSOR WALL
        </h1>
        <div className="text-gold/80 text-sm md:text-base font-medium tracking-wider">
          Spinning Slot Animation
        </div>
        <div className="text-muted-foreground text-xs md:text-sm mt-2">
          Sponsor logo moves left → right (spinning effect!)
        </div>
      </div>

      {/* 24-Slot Grid */}
      <div className="grid grid-cols-6 gap-3 md:gap-4 lg:gap-6 justify-items-center">
        {Array.from({ length: 24 }, (_, index) => {
          const slotId = index + 1;
          const sponsor = getSponsorForSlot(slotId);
          const isActive = activeSlots.has(slotId);
          const delay = index * 100; // Staggered animation delay

          return (
            <SponsorSlot
              key={slotId}
              id={slotId}
              sponsor={sponsor}
              isActive={isActive}
              delay={delay}
            />
          );
        })}
      </div>

      {/* Layer Information */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="bg-secondary/50 p-4 rounded-xl border border-gold/20">
          <div className="text-gold font-bold mb-2">Layer 1</div>
          <div className="text-sm text-muted-foreground">Static Display</div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-gold/20">
          <div className="text-gold font-bold mb-2">Layer 2</div>
          <div className="text-sm text-muted-foreground">Hologram Effects</div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-gold/20">
          <div className="text-gold font-bold mb-2">Layer 3</div>
          <div className="text-sm text-muted-foreground">Augmented Reality</div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-gold/20 ring-2 ring-gold/40">
          <div className="text-gold-bright font-bold mb-2">Layer 4</div>
          <div className="text-sm text-foreground">Spinning Animation</div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="mt-8 text-center">
        <div className="text-xs text-muted-foreground">
          Optimized for Tablets • Walking Billboards • 5D Beamer System
        </div>
        <div className="text-xs text-gold/60 mt-1">
          24-Slot Framework • Cross-Platform Compatible
        </div>
      </div>
    </div>
  );
};