import { useState, useEffect } from "react";
import { SponsorSlot } from "./SponsorSlot";
import { LayerInfo } from "./LayerInfo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Layer types
type Layer = 1 | 2 | 3 | 4;

interface LayerConfig {
  id: Layer;
  name: string;
  description: string;
  isActive?: boolean;
}

const layerConfigs: LayerConfig[] = [
  { id: 1, name: "Static Display", description: "Basic sponsor display mode" },
  { id: 2, name: "Hologram Effects", description: "3D holographic overlays" },
  { id: 3, name: "Augmented Reality", description: "AR integration layer" },
  { id: 4, name: "Spinning Animation", description: "Dynamic slot animations", isActive: true },
];

// Mock sponsors data
const mockSponsors = [
  { id: 1, name: "TechCorp", logo: "/api/placeholder/80/80" },
  { id: 5, name: "InnovateCo", logo: "/api/placeholder/80/80" },
  { id: 12, name: "FutureTech", logo: "/api/placeholder/80/80" },
  { id: 18, name: "NexGen", logo: "/api/placeholder/80/80" },
];

export const SponsorWall = () => {
  const [activeLayer, setActiveLayer] = useState<Layer>(4);
  const [activeSlots, setActiveSlots] = useState<Set<number>>(new Set());
  const [hologramSlots, setHologramSlots] = useState<Set<number>>(new Set());
  const [arSlots, setArSlots] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeLayer === 2) {
      // Hologram effects - slower, more dramatic
      interval = setInterval(() => {
        const randomSlot = Math.floor(Math.random() * 24) + 1;
        setHologramSlots(prev => {
          const newSet = new Set(prev);
          if (newSet.has(randomSlot)) {
            newSet.delete(randomSlot);
          } else {
            newSet.add(randomSlot);
          }
          if (newSet.size > 4) {
            const firstActive = Array.from(newSet)[0];
            newSet.delete(firstActive);
          }
          return newSet;
        });
      }, 4000);
    } else if (activeLayer === 3) {
      // AR effects - rapid activation
      interval = setInterval(() => {
        const randomSlot = Math.floor(Math.random() * 24) + 1;
        setArSlots(prev => {
          const newSet = new Set(prev);
          if (newSet.has(randomSlot)) {
            newSet.delete(randomSlot);
          } else {
            newSet.add(randomSlot);
          }
          if (newSet.size > 6) {
            const firstActive = Array.from(newSet)[0];
            newSet.delete(firstActive);
          }
          return newSet;
        });
      }, 2000);
    } else if (activeLayer === 4) {
      // Spinning animation
      interval = setInterval(() => {
        const randomSlot = Math.floor(Math.random() * 24) + 1;
        setActiveSlots(prev => {
          const newSet = new Set(prev);
          if (newSet.has(randomSlot)) {
            newSet.delete(randomSlot);
          } else {
            newSet.add(randomSlot);
          }
          if (newSet.size > 3) {
            const firstActive = Array.from(newSet)[0];
            newSet.delete(firstActive);
          }
          return newSet;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeLayer]);

  const handleLayerChange = (layer: Layer) => {
    setActiveLayer(layer);
    
    // Clear all active states when switching layers
    setActiveSlots(new Set());
    setHologramSlots(new Set());
    setArSlots(new Set());
    
    // Show toast notification
    const layerName = layerConfigs.find(l => l.id === layer)?.name;
    toast({
      title: `Layer ${layer} Activated`,
      description: `Switched to ${layerName} mode`,
    });
  };

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
          const delay = index * 100; // Staggered animation delay

          // Determine slot state based on active layer
          let isActive = false;
          let slotMode = 'static';
          
          if (activeLayer === 1) {
            slotMode = 'static';
          } else if (activeLayer === 2) {
            isActive = hologramSlots.has(slotId);
            slotMode = 'hologram';
          } else if (activeLayer === 3) {
            isActive = arSlots.has(slotId);
            slotMode = 'ar';
          } else if (activeLayer === 4) {
            isActive = activeSlots.has(slotId);
            slotMode = 'spinning';
          }

          return (
            <SponsorSlot
              key={slotId}
              id={slotId}
              sponsor={sponsor}
              isActive={isActive}
              delay={delay}
              mode={slotMode as 'static' | 'hologram' | 'ar' | 'spinning'}
            />
          );
        })}
      </div>

      {/* Layer Controls */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        {layerConfigs.map((layer) => (
          <Button
            key={layer.id}
            variant={activeLayer === layer.id ? "default" : "outline"}
            className={`
              p-6 h-auto flex flex-col items-center justify-center
              transition-all duration-300 hover:scale-105
              ${activeLayer === layer.id 
                ? "bg-gold text-primary-foreground shadow-lg shadow-gold/40 border-gold" 
                : "bg-secondary/50 border-gold/20 hover:border-gold/40"
              }
            `}
            onClick={() => handleLayerChange(layer.id)}
          >
            <div className="font-bold mb-2">Layer {layer.id}</div>
            <div className="text-sm opacity-90">{layer.name}</div>
            <div className="text-xs opacity-60 mt-1">{layer.description}</div>
            {activeLayer === layer.id && (
              <div className="mt-2 w-2 h-2 bg-gold-bright rounded-full animate-pulse" />
            )}
          </Button>
        ))}
      </div>

      {/* Layer Status Display */}
      <div className="mt-8 text-center">
        <div className="bg-secondary/30 rounded-xl p-4 border border-gold/20 max-w-md mx-auto">
          <div className="text-gold font-semibold text-lg">
            Active Layer: {activeLayer}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {layerConfigs.find(l => l.id === activeLayer)?.description}
          </div>
          <div className="mt-3 flex justify-center space-x-2">
            {activeLayer === 1 && (
              <div className="text-xs bg-muted px-3 py-1 rounded-full">
                📺 Static Mode Active
              </div>
            )}
            {activeLayer === 2 && (
              <div className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full animate-pulse">
                🔮 Hologram Effects Online
              </div>
            )}
            {activeLayer === 3 && (
              <div className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                🥽 AR Integration Active
              </div>
            )}
            {activeLayer === 4 && (
              <div className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full animate-spin-float">
                ⚡ Spinning Animations Live
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Layer Information Details */}
      <LayerInfo activeLayer={activeLayer} />

      {/* Performance Stats */}
      <div className="mt-8 text-center">
        <div className="text-xs text-muted-foreground">
          Optimized for Tablets • Walking Billboards • 5D Beamer System
        </div>
        <div className="text-xs text-gold/60 mt-1">
          24-Slot Framework • Cross-Platform Compatible • Real-time Layer Switching
        </div>
      </div>
    </div>
  );
};