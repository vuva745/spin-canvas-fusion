import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpinningSlotProps {
  id: number;
  sponsor?: {
    name: string;
    logo: string;
    product?: string; // AR product/mascot image
    mascot?: string; // Alternative mascot image
  };
  isActive?: boolean;
  delay?: number;
  onClick?: () => void;
  isSelected?: boolean;
  spinDuration?: number; // Duration in milliseconds
  rotationDegrees?: number; // 180-360 degrees
}

export const SpinningSlot = ({ 
  id, 
  sponsor, 
  isActive = false, 
  delay = 0, 
  onClick, 
  isSelected = false,
  spinDuration = 3000,
  rotationDegrees = 360
}: SpinningSlotProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [glowSweep, setGlowSweep] = useState(0);
  const [arObjectPosition, setArObjectPosition] = useState({ x: 0, y: 0 });
  const [hologramParticles, setHologramParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [logoError, setLogoError] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Initialize hologram particles
  useEffect(() => {
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2000
    }));
    setHologramParticles(particles);
  }, []);

  // Handle spinning animation
  useEffect(() => {
    if (!isSpinning) return;

    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      // Calculate rotation
      const currentRotation = startRotation + (rotationDegrees * easeOut);
      setRotation(currentRotation);

      // Glow sweep effect
      const sweepProgress = (elapsed % 1000) / 1000; // 1 second cycle
      setGlowSweep(sweepProgress * 100);

      // AR object orbiting
      const orbitProgress = (elapsed % 2000) / 2000; // 2 second orbit
      const angle = orbitProgress * Math.PI * 2;
      const radius = 60; // Distance from center
      setArObjectPosition({
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // AR object "lands" near logo
        setArObjectPosition({ x: 70, y: 30 });
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, spinDuration, rotationDegrees, rotation]);

  // Auto-spin logic
  useEffect(() => {
    if (!isActive) return;

    const startSpin = () => {
      setIsSpinning(true);
    };

    // Initial delay
    const initialTimer = setTimeout(startSpin, delay);

    // Periodic spinning
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        startSpin();
      }
    }, 8000 + Math.random() * 12000); // 8-20 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isActive, delay]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    // Manual spin on click
    setIsSpinning(true);
  };

  return (
    <div
      ref={slotRef}
      className={cn(
        "spinning-slot group relative h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32",
        "flex items-center justify-center",
        "transition-all duration-500 ease-out",
        "cursor-pointer hover:shadow-2xl hover:scale-105",
        "border-2 border-gold/80 bg-gradient-to-br from-gold/10 to-gold-bright/10",
        "shadow-lg backdrop-blur-sm",
        isSelected && "ring-2 ring-gold bg-gold/30 border-gold shadow-gold/50",
        isActive && "animate-gold-pulse hologram-slot"
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
      onClick={handleClick}
    >
      {/* Layer 1: Core Sponsor Logo (always visible) */}
      {sponsor && (
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full w-full p-2"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <div className="relative">
            {!logoError ? (
              /* Logo with soft glow/outline */
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                style={{
                  filter: id === 8 && sponsor.name === 'Samsung' 
                    ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.4))' // Blue glow for Samsung
                    : 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.3))' // Gold glow for others
                }}
                onError={() => setLogoError(true)}
              />
            ) : (
              /* Fallback text display */
              <div className="flex flex-col items-center justify-center h-full w-full text-center p-1">
                <div className="fallback-text text-xs md:text-sm font-bold mb-1 leading-tight">
                  {sponsor.name}
                </div>
                <div className="fallback-text text-xs font-medium">
                  {sponsor.category}
                </div>
                {sponsor.country && (
                  <div className="fallback-text text-xs mt-1">
                    {sponsor.country}
                  </div>
                )}
              </div>
            )}
            
            {/* Glow sweep effect during spin */}
            {isSpinning && (
              <div 
                className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-60 ${
                  id === 8 && sponsor?.name === 'Samsung' 
                    ? 'via-blue-500/40' // Blue sweep for Samsung
                    : 'via-gold/40'     // Gold sweep for others
                }`}
                style={{
                  transform: `translateX(${glowSweep - 100}%)`,
                  transition: 'none'
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Layer 2: Hologram Effects */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Holographic shell background */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/20 via-transparent to-blue-500/20 animate-pulse" />
          
          {/* Floating particles */}
          {hologramParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-pink-400/60 rounded-full animate-float-gently"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}ms`,
                animationDuration: '3s'
              }}
            />
          ))}
          
          {/* Laser-like lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400/40 to-transparent animate-pulse" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-pulse" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse" />
          </div>
        </div>
      )}

      {/* Layer 3: AR Effects */}
      {isActive && sponsor && (sponsor.product || sponsor.mascot) && (
        <div className="absolute inset-0 pointer-events-none">
          {/* AR Object (product/mascot) */}
          <div
            className="absolute w-8 h-8 md:w-10 md:h-10 transition-all duration-1000 ease-out"
            style={{
              left: `${arObjectPosition.x}%`,
              top: `${arObjectPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <img
              src={sponsor.product || sponsor.mascot}
              alt={`${sponsor.name} AR Object`}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 0, 0.3))'
              }}
            />
            
            {/* AR object glow effect when landing */}
            {!isSpinning && (
              <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping" />
            )}
          </div>
          
          {/* AR connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            <line
              x1="50%"
              y1="50%"
              x2={`${arObjectPosition.x}%`}
              y2={`${arObjectPosition.y}%`}
              stroke="rgba(0, 255, 0, 0.4)"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}

      {/* Layer 4: Spinning Animation Effects */}
      {isSpinning && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Spinning glow ring */}
          <div 
            className={`absolute inset-0 rounded-xl border-2 animate-spin ${
              id === 8 && sponsor?.name === 'Samsung' 
                ? 'border-blue-500/60' // Blue ring for Samsung
                : 'border-gold/60'     // Gold ring for others
            }`} 
            style={{ animationDuration: '2s' }} 
          />
          
          {/* Radial glow effect */}
          <div 
            className={`absolute inset-0 rounded-xl bg-gradient-radial via-transparent to-transparent animate-pulse ${
              id === 8 && sponsor?.name === 'Samsung' 
                ? 'from-blue-500/20' // Blue radial glow for Samsung
                : 'from-gold/20'     // Gold radial glow for others
            }`} 
          />
        </div>
      )}

      {/* Active State Indicator */}
      {isActive && (
        <div 
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
            id === 8 && sponsor?.name === 'Samsung' 
              ? 'bg-blue-500 shadow-blue-500/50' // Blue indicator for Samsung
              : 'bg-gold shadow-gold/50'         // Gold indicator for others
          }`} 
        />
      )}

      {/* Slot number for empty slots */}
      {!sponsor && (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          <div className="text-slot-text text-xs md:text-sm font-medium opacity-80">
            Slot {id}
          </div>
        </div>
      )}
      
      {/* Light burst effect for hologram mode */}
      <div className="light-burst"></div>
    </div>
  );
};
