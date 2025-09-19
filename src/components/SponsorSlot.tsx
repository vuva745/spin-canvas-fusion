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
  onClick?: () => void;
  isSelected?: boolean;
}

export const SponsorSlot = ({ id, sponsor, isActive, delay = 0, mode = 'static', onClick, isSelected }: SponsorSlotProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setIsSpinning(false);
  }, [mode]);

  const getModeStyles = () => {
    switch (mode) {
       case 'hologram':
         return {
           className: "border-blue-400/80 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 shadow-lg backdrop-blur-sm ring-2 ring-blue-400/60 shadow-[0_0_20px_rgba(0,150,255,0.6)] shadow-[0_0_40px_rgba(0,150,255,0.3)]",
           glow: "shadow-blue-400/80",
         };
      case 'ar':
        return {
          className: "border-blue-400/80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg backdrop-blur-sm ring-2 ring-blue-400/60 shadow-[0_0_20px_rgba(0,150,255,0.5)]",
          glow: "shadow-blue-400/80",
        };
      case 'spinning':
        return {
          className: "border-gold/80 bg-gradient-to-br from-gold/10 to-gold-bright/10",
          glow: "shadow-gold/50",
        };
      default:
        return {
          className: "border-gold/80 bg-gradient-to-br from-gold/10 to-gold-bright/10 shadow-lg",
          glow: "shadow-gold/50",
        };
    }
  };

  const modeStyles = getModeStyles();

  return (
    <div
      className={cn(
        "sponsor-slot group h-20 w-32 md:h-24 md:w-40 lg:h-28 lg:w-44",
        "flex items-center justify-center",
        "transition-none transform-gpu",
        "perspective-1000",
        mode === 'static' && onClick && "cursor-pointer",
        mode !== 'static' && "cursor-pointer",
        modeStyles.className,
        isSelected && mode === 'static' && "ring-2 ring-gold bg-gold/30 border-gold shadow-gold/50",
         isSelected && mode === 'hologram' && "ring-2 ring-blue-400 bg-blue-500/30 border-blue-400 shadow-blue-400/50",
         isSelected && mode === 'ar' && "ring-2 ring-blue-400 bg-blue-500/30 border-blue-400 shadow-blue-400/50",
        isActive && mode === 'hologram' && "hologram-slot",
         isActive && mode === 'ar' && "hologram-slot",
        isActive && `hover:${modeStyles.glow}`
      )}
      style={{
        transform: 'perspective(1000px) rotateX(1deg) rotateY(0deg) translateZ(5px)',
        transformStyle: 'preserve-3d',
        ...(isSelected && {
          transform: 'perspective(1000px) rotateX(2deg) rotateY(1deg) translateZ(10px)',
        })
      }}
      onClick={onClick}
    >
      {sponsor ? (
        <div className="flex flex-col items-center justify-center h-full w-full p-2">
          {!logoError ? (
             <img
               src={sponsor.logo}
               alt={sponsor.name}
               onLoad={() => console.log('Logo loaded successfully:', sponsor.logo)}
               className={cn(
                 "max-w-full max-h-full object-contain filter relative z-10",
                 "transform-gpu transition-transform duration-300",
                 (mode === 'ar' || mode === 'hologram') && "drop-shadow-[0_0_20px_rgba(0,150,255,1)]"
               )}
               style={{
                 // 3D effects for all modes
                 transform: mode === 'hologram' ? 
                   (sponsor.name.toLowerCase().includes('microsoft') 
                     ? 'perspective(1000px) rotateX(5deg) rotateY(0deg) translateZ(20px)'
                     : 'perspective(1000px) rotateX(10deg) rotateY(0deg) translateZ(20px)')
                   : mode === 'ar' ?
                   (sponsor.name.toLowerCase().includes('microsoft') 
                     ? 'perspective(1000px) rotateX(5deg) rotateY(0deg) translateZ(20px)'
                     : 'perspective(1000px) rotateX(10deg) rotateY(0deg) translateZ(20px)')
                   : 'perspective(1000px) rotateX(2deg) rotateY(1deg) translateZ(10px)',
                 
                 // Enhanced 3D shadows and effects
                 filter: mode === 'hologram' ? 
                   'brightness(1.3) contrast(1.2) drop-shadow(0 0 15px rgba(0, 150, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 150, 255, 0.6))'
                   : mode === 'ar' ?
                   (sponsor.name.toLowerCase().includes('microsoft') 
                     ? 'brightness(1.2) contrast(1.1) drop-shadow(0 0 20px rgba(0, 150, 255, 1)) drop-shadow(0 0 40px rgba(0, 150, 255, 0.8))'
                     : 'brightness(0) saturate(0) invert(1) contrast(2) hue-rotate(200deg) saturate(3) drop-shadow(0 0 20px rgba(0, 150, 255, 1)) drop-shadow(0 0 40px rgba(0, 150, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 150, 255, 0.6))')
                   : 'brightness(1.1) contrast(1.05) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
                 
                 // Active state enhancements
                 ...(isActive && {
                   transform: mode === 'hologram' ?
                     (sponsor.name.toLowerCase().includes('microsoft')
                       ? 'perspective(1000px) rotateX(8deg) rotateY(2deg) scale(1.05) translateZ(30px)'
                       : 'perspective(1000px) rotateX(15deg) rotateY(5deg) scale(1.1) translateZ(30px)')
                     : mode === 'ar' ?
                     (sponsor.name.toLowerCase().includes('microsoft')
                       ? 'perspective(1000px) rotateX(8deg) rotateY(2deg) scale(1.05) translateZ(30px)'
                       : 'perspective(1000px) rotateX(15deg) rotateY(5deg) scale(1.1) translateZ(30px)')
                     : 'perspective(1000px) rotateX(3deg) rotateY(2deg) scale(1.02) translateZ(15px)',
                   filter: mode === 'hologram' ?
                     'brightness(1.4) contrast(1.3) drop-shadow(0 0 20px rgba(0, 150, 255, 1)) drop-shadow(0 0 40px rgba(0, 150, 255, 0.8))'
                     : mode === 'ar' ?
                     (sponsor.name.toLowerCase().includes('microsoft')
                       ? 'brightness(1.4) contrast(1.2) drop-shadow(0 0 25px rgba(0, 150, 255, 1)) drop-shadow(0 0 50px rgba(0, 150, 255, 0.9))'
                       : 'brightness(0) saturate(0) invert(1) contrast(2.5) hue-rotate(200deg) saturate(4) drop-shadow(0 0 25px rgba(0, 150, 255, 1)) drop-shadow(0 0 50px rgba(0, 150, 255, 1)) drop-shadow(0 0 80px rgba(0, 150, 255, 0.8))')
                     : 'brightness(1.15) contrast(1.1) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 12px 24px rgba(0, 0, 0, 0.3))'
                 })
               }}
               onError={(e) => {
                 console.log('Logo failed to load:', sponsor.logo, e);
                 setLogoError(true);
               }}
             />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full text-center p-1">
              <div className={cn(
                "text-xs md:text-sm font-bold mb-1 leading-tight",
                mode === 'hologram' && isActive ? "fallback-text" : "text-gold"
              )}>
                {sponsor.name}
              </div>
              <div className={cn(
                "text-xs font-medium",
                mode === 'hologram' && isActive ? "fallback-text" : "text-gold/70"
              )}>
                {sponsor.category}
              </div>
              {sponsor.country && (
                <div className={cn(
                  "text-xs mt-1",
                  mode === 'hologram' && isActive ? "fallback-text" : "text-gold/50"
                )}>
                  {sponsor.country}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full w-full p-3">
          {/* Slot Identifier */}
          <div className="text-lg font-bold text-gold">S{id.toString().padStart(2, '0')}</div>
          
          {/* Pricing Information */}
          <div className="text-white text-sm space-y-1">
            <div>Day €5.000</div>
            <div>Weekend €12.5k</div>
            <div>Week €25k</div>
          </div>
          
          {/* Decorative Grid */}
          <div className="flex justify-end">
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gold rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Light burst effect for hologram mode */}
      {mode === 'hologram' && isActive && (
        <div className="light-burst"></div>
      )}
      
      {/* Mode-specific Effects */}
       {mode === 'hologram' && (
         <>
           {/* Enhanced neon glow - always visible */}
           <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 via-cyan-400/8 to-blue-500/10 opacity-100 pointer-events-none" 
                style={{
                  boxShadow: '0 0 20px rgba(0, 150, 255, 0.8), 0 0 40px rgba(0, 150, 255, 0.4), 0 0 60px rgba(0, 150, 255, 0.2)',
                  animation: 'neonPulse 2s ease-in-out infinite alternate'
                }} />
           
           {/* Outer neon ring */}
           <div className="absolute -inset-1 rounded-xl border border-blue-400/60 pointer-events-none" 
                style={{
                  boxShadow: '0 0 15px rgba(0, 150, 255, 0.6), inset 0 0 15px rgba(0, 150, 255, 0.3)',
                  animation: 'neonPulse 2.5s ease-in-out infinite alternate'
                }} />
           
           {/* Inner neon glow */}
           <div className="absolute inset-1 rounded-xl bg-gradient-to-r from-transparent via-blue-400/15 to-transparent opacity-100 pointer-events-none" 
                style={{
                  animation: 'neonSweep 3s linear infinite'
                }} />
           
           {/* 3D Holographic Rings with enhanced glow */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 150, 255, 0.2) 90deg, transparent 180deg, rgba(0, 150, 255, 0.2) 270deg, transparent 360deg)',
             boxShadow: 'inset 0 0 20px rgba(0, 150, 255, 0.3)',
             animation: 'hologramRotate 4s linear infinite'
           }} />
           
           {/* Enhanced scan lines with glow */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0, 150, 255, 0.15) 1px, transparent 2px, transparent 20px)',
             boxShadow: '0 0 10px rgba(0, 150, 255, 0.4)',
             animation: 'arScan 3s linear infinite'
           }} />
           
           {/* Enhanced 3D depth with neon */}
           <div className="absolute inset-0 opacity-8 pointer-events-none" style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.1) 0%, transparent 70%)',
             transform: 'perspective(1000px) translateZ(10px)',
             boxShadow: '0 0 30px rgba(0, 150, 255, 0.5)',
             animation: 'hologramPulse3D 4s ease-in-out infinite'
           }} />
         </>
       )}
      
       {mode === 'ar' && (
         <>
           {/* Always visible blue neon glow */}
           <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/15 via-transparent to-cyan-400/15 opacity-100 pointer-events-none" />
           <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
           <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
           
           {/* 3D Holographic Rings */}
           <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
             background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 150, 255, 0.2) 90deg, transparent 180deg, rgba(0, 150, 255, 0.2) 270deg, transparent 360deg)'
           }} />
           
           {/* AR Scan Lines */}
           <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
             background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0, 150, 255, 0.15) 1px, transparent 2px, transparent 20px)',
             animation: 'arScan 3s linear infinite'
           }} />
           
           {/* 3D Depth Effect */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.1) 0%, transparent 70%)',
             transform: 'perspective(1000px) translateZ(10px)',
             animation: 'hologramPulse3D 4s ease-in-out infinite'
           }} />
         </>
       )}
      
      
      {/* Active State Indicators */}
       {isActive && mode === 'hologram' && (
         <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-blue-400/50" />
       )}
      
       {isActive && mode === 'ar' && (
         <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-blue-400/50" />
       )}
      
      
      {/* Layer-specific overlays - removed to prevent blocking logos */}
    </div>
  );
};