import { useState, useEffect } from "react";
import { SponsorSlot } from "./SponsorSlot";
import { SpinningSlot } from "./SpinningSlot";
import { ProductOutline } from "./ProductOutline";
import { LayerInfo } from "./LayerInfo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCompanies, useSlots, useSystemHealth } from "../hooks/useApi";

// Layer types
type Layer = 1 | 2 | 3 | 4;

interface LayerConfig {
  id: Layer;
  name: string;
  description: string;
  isActive?: boolean;
}

const layerConfigs: LayerConfig[] = [
  { id: 1, name: "Static Display", description: "Basic sponsor display mode", isActive: true },
  { id: 2, name: "Hologram Effects", description: "Holographic sponsor display mode" },
  { id: 3, name: "AR", description: "Augmented Reality display mode" },
  { id: 4, name: "Spinning Animation", description: "Dynamic slot animations" },
];

// Slot content data for Layer 1 - Static Display
const slotContent = {
  1: { title: "Technology Solutions", description: "Advanced tech solutions for modern businesses", category: "Technology", icon: "💻" },
  2: { title: "Innovation Hub", description: "Cutting-edge innovation and research center", category: "Innovation", icon: "🚀" },
  3: { title: "Digital Marketing", description: "Comprehensive digital marketing strategies", category: "Marketing", icon: "📱" },
  4: { title: "Cloud Services", description: "Scalable cloud infrastructure solutions", category: "Cloud", icon: "☁️" },
  5: { title: "AI & Machine Learning", description: "Artificial intelligence and ML solutions", category: "AI/ML", icon: "🤖" },
  6: { title: "Data Analytics", description: "Advanced data analysis and insights", category: "Analytics", icon: "📊" },
  7: { title: "Cybersecurity", description: "Enterprise-grade security solutions", category: "Security", icon: "🔒" },
  8: { title: "Mobile Development", description: "Native and cross-platform mobile apps", category: "Mobile", icon: "📲" },
  9: { title: "Blockchain Solutions", description: "Decentralized blockchain applications", category: "Blockchain", icon: "⛓️" },
  10: { title: "IoT Integration", description: "Internet of Things connectivity solutions", category: "IoT", icon: "🌐" },
  11: { title: "VR/AR Experiences", description: "Immersive virtual and augmented reality", category: "VR/AR", icon: "🥽" },
  12: { title: "Green Technology", description: "Sustainable and eco-friendly solutions", category: "Sustainability", icon: "🌱" },
  13: { title: "Financial Technology", description: "Fintech solutions and digital banking", category: "FinTech", icon: "💰" },
  14: { title: "Healthcare Tech", description: "Digital health and medical technology", category: "Healthcare", icon: "🏥" },
  15: { title: "Education Platform", description: "E-learning and educational technology", category: "Education", icon: "🎓" },
  16: { title: "Automotive Tech", description: "Smart automotive and transportation", category: "Automotive", icon: "🚗" },
  17: { title: "Retail Solutions", description: "E-commerce and retail technology", category: "Retail", icon: "🛒" },
  18: { title: "Media & Entertainment", description: "Digital media and content platforms", category: "Media", icon: "🎬" },
  19: { title: "Logistics Tech", description: "Supply chain and logistics optimization", category: "Logistics", icon: "📦" },
  20: { title: "Agriculture Tech", description: "Smart farming and agricultural solutions", category: "Agriculture", icon: "🚜" },
  21: { title: "Energy Solutions", description: "Renewable energy and power management", category: "Energy", icon: "⚡" },
  22: { title: "Space Technology", description: "Aerospace and space exploration tech", category: "Aerospace", icon: "🚀" },
  23: { title: "Biotechnology", description: "Biotech and life sciences innovation", category: "Biotech", icon: "🧬" },
  24: { title: "Quantum Computing", description: "Next-generation quantum computing", category: "Quantum", icon: "⚛️" },
};

// Hologram content data for Layer 2 - Hologram Effects
const hologramContent = {
  1: { title: "Quantum Holography", description: "Advanced quantum-based holographic projection systems", category: "Quantum Tech", icon: "⚛️", effect: "quantum" },
  2: { title: "Neural Interface", description: "Brain-computer interface holographic displays", category: "Neural Tech", icon: "🧠", effect: "neural" },
  3: { title: "Holographic AI", description: "Artificial intelligence with holographic consciousness", category: "AI Hologram", icon: "🤖", effect: "ai" },
  4: { title: "Light Field Display", description: "True 3D light field holographic technology", category: "Light Field", icon: "💫", effect: "light" },
  5: { title: "Holographic Memory", description: "Data storage in holographic crystal matrices", category: "Data Storage", icon: "💎", effect: "crystal" },
  6: { title: "Holographic Sensors", description: "Advanced sensing through holographic arrays", category: "Sensors", icon: "📡", effect: "sensor" },
  7: { title: "Holographic Security", description: "Multi-dimensional security holographic systems", category: "Security", icon: "🔐", effect: "security" },
  8: { title: "Holographic Medicine", description: "Medical imaging and treatment via holography", category: "Medical", icon: "🏥", effect: "medical" },
  9: { title: "Holographic Architecture", description: "Building design through holographic modeling", category: "Architecture", icon: "🏗️", effect: "architect" },
  10: { title: "Holographic Communication", description: "Real-time holographic telepresence systems", category: "Communication", icon: "📞", effect: "comm" },
  11: { title: "Holographic Entertainment", description: "Immersive holographic entertainment experiences", category: "Entertainment", icon: "🎭", effect: "entertainment" },
  12: { title: "Holographic Education", description: "Interactive holographic learning environments", category: "Education", icon: "🎓", effect: "education" },
  13: { title: "Holographic Manufacturing", description: "3D manufacturing through holographic guidance", category: "Manufacturing", icon: "🏭", effect: "manufacturing" },
  14: { title: "Holographic Navigation", description: "Advanced navigation using holographic maps", category: "Navigation", icon: "🧭", effect: "navigation" },
  15: { title: "Holographic Research", description: "Scientific research through holographic visualization", category: "Research", icon: "🔬", effect: "research" },
  16: { title: "Holographic Gaming", description: "Next-generation holographic gaming platforms", category: "Gaming", icon: "🎮", effect: "gaming" },
  17: { title: "Holographic Fashion", description: "Virtual fashion design and holographic modeling", category: "Fashion", icon: "👗", effect: "fashion" },
  18: { title: "Holographic Art", description: "Digital art creation through holographic mediums", category: "Digital Art", icon: "🎨", effect: "art" },
  19: { title: "Holographic Sports", description: "Sports training and analysis via holography", category: "Sports", icon: "⚽", effect: "sports" },
  20: { title: "Holographic Space", description: "Space exploration through holographic simulation", category: "Space Tech", icon: "🚀", effect: "space" },
  21: { title: "Holographic Energy", description: "Energy management through holographic monitoring", category: "Energy", icon: "⚡", effect: "energy" },
  22: { title: "Holographic Environment", description: "Environmental monitoring via holographic systems", category: "Environment", icon: "🌍", effect: "environment" },
  23: { title: "Holographic Time", description: "Temporal analysis through holographic chronometry", category: "Temporal", icon: "⏰", effect: "time" },
  24: { title: "Holographic Reality", description: "Mixed reality experiences through holographic integration", category: "Mixed Reality", icon: "🌐", effect: "reality" },
};

// AR content data for Layer 3 - Using Saved Product Images
const arContent = {
  // Row 1 - Using saved product images
  1: { title: "Athletic Sneakers", description: "Premium athletic sneakers with advanced cushioning technology", category: "Footwear", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker.png" },
  2: { title: "Designer Handbag", description: "Luxury handbag with premium materials and elegant design", category: "Fashion", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag.png" },
  3: { title: "Athletic Sneakers Pro", description: "Professional-grade athletic sneakers for serious athletes", category: "Sports", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker (2).png" },
  4: { title: "Smartphone", description: "Latest generation smartphone with advanced features", category: "Electronics", icon: "📱", effect: "phone", productType: "phone", productImage: "/images/products/phone.png" },
  
  // Row 2 - Using saved product images
  5: { title: "Designer Handbag Classic", description: "Classic handbag design with timeless appeal", category: "Fashion", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag (2).png" },
  6: { title: "Athletic Sneakers Elite", description: "Elite athletic sneakers with cutting-edge technology", category: "Sports", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker (3).png" },
  7: { title: "Premium Handbag", description: "Premium handbag with sophisticated styling", category: "Luxury", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag (3).png" },
  8: { title: "Smartphone Pro", description: "Professional smartphone with enhanced capabilities", category: "Electronics", icon: "📱", effect: "phone", productType: "phone", productImage: "/images/products/phone.png" },
  
  // Row 3 - Cycling through available products
  9: { title: "Athletic Sneakers", description: "High-performance athletic sneakers for all sports", category: "Footwear", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker.png" },
  10: { title: "Designer Handbag", description: "Elegant handbag perfect for any occasion", category: "Fashion", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag.png" },
  11: { title: "Athletic Sneakers Pro", description: "Professional athletic sneakers with superior comfort", category: "Sports", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker (2).png" },
  12: { title: "Smartphone", description: "Advanced smartphone with innovative features", category: "Electronics", icon: "📱", effect: "phone", productType: "phone", productImage: "/images/products/phone.png" },
  
  // Row 4 - Cycling through available products
  13: { title: "Designer Handbag Classic", description: "Classic handbag with modern functionality", category: "Fashion", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag (2).png" },
  14: { title: "Athletic Sneakers Elite", description: "Elite sneakers for the serious athlete", category: "Sports", icon: "👟", effect: "sneaker", productType: "sneaker", productImage: "/images/products/sneaker (3).png" },
  15: { title: "Premium Handbag", description: "Premium handbag with luxury materials", category: "Luxury", icon: "👜", effect: "handbag", productType: "handbag", productImage: "/images/products/handbag (3).png" },
  16: { title: "Smartphone Pro", description: "Professional smartphone for business users", category: "Electronics", icon: "📱", effect: "phone", productType: "phone", productImage: "/images/products/phone.png" },
};

// Spinning content data for Layer 4 - Spinning Animations
const spinningContent = {
  1: { title: "Golden Spinner", description: "Premium golden spinning animation with luxury effects", category: "Premium", icon: "✨", effect: "golden" },
  2: { title: "Velocity Spinner", description: "High-speed spinning with dynamic acceleration", category: "Speed", icon: "⚡", effect: "velocity" },
  3: { title: "Cosmic Spinner", description: "Galactic spinning with starfield effects", category: "Space", icon: "🌌", effect: "cosmic" },
  4: { title: "Neon Spinner", description: "Cyberpunk neon spinning with glow effects", category: "Cyber", icon: "💫", effect: "neon" },
  5: { title: "Crystal Spinner", description: "Crystalline spinning with prismatic reflections", category: "Crystal", icon: "💎", effect: "crystal" },
  6: { title: "Fire Spinner", description: "Flame spinning with dynamic fire effects", category: "Fire", icon: "🔥", effect: "fire" },
  7: { title: "Ice Spinner", description: "Frozen spinning with frost and snow effects", category: "Ice", icon: "❄️", effect: "ice" },
  8: { title: "Lightning Spinner", description: "Electric spinning with lightning bolt effects", category: "Electric", icon: "⚡", effect: "lightning" },
  9: { title: "Rainbow Spinner", description: "Colorful spinning with spectrum effects", category: "Rainbow", icon: "🌈", effect: "rainbow" },
  10: { title: "Shadow Spinner", description: "Dark spinning with shadow and mystery effects", category: "Shadow", icon: "🌑", effect: "shadow" },
  11: { title: "Phoenix Spinner", description: "Rebirth spinning with phoenix flame effects", category: "Phoenix", icon: "🔥", effect: "phoenix" },
  12: { title: "Dragon Spinner", description: "Mystical spinning with dragon scale effects", category: "Dragon", icon: "🐉", effect: "dragon" },
  13: { title: "Ocean Spinner", description: "Aquatic spinning with wave and current effects", category: "Ocean", icon: "🌊", effect: "ocean" },
  14: { title: "Forest Spinner", description: "Nature spinning with leaf and wind effects", category: "Nature", icon: "🍃", effect: "forest" },
  15: { title: "Mountain Spinner", description: "Earth spinning with rock and mineral effects", category: "Earth", icon: "⛰️", effect: "mountain" },
  16: { title: "Cloud Spinner", description: "Sky spinning with cloud and weather effects", category: "Sky", icon: "☁️", effect: "cloud" },
  17: { title: "Sun Spinner", description: "Solar spinning with sunlight and heat effects", category: "Solar", icon: "☀️", effect: "sun" },
  18: { title: "Moon Spinner", description: "Lunar spinning with moonlight and tide effects", category: "Lunar", icon: "🌙", effect: "moon" },
  19: { title: "Star Spinner", description: "Stellar spinning with constellation effects", category: "Stellar", icon: "⭐", effect: "star" },
  20: { title: "Planet Spinner", description: "Planetary spinning with orbit effects", category: "Planetary", icon: "🪐", effect: "planet" },
  21: { title: "Comet Spinner", description: "Celestial spinning with tail and trail effects", category: "Celestial", icon: "☄️", effect: "comet" },
  22: { title: "Aurora Spinner", description: "Polar spinning with aurora borealis effects", category: "Aurora", icon: "🌌", effect: "aurora" },
  23: { title: "Nebula Spinner", description: "Cosmic spinning with nebula and gas effects", category: "Nebula", icon: "🌌", effect: "nebula" },
  24: { title: "Infinity Spinner", description: "Eternal spinning with infinite loop effects", category: "Infinity", icon: "∞", effect: "infinity" },
};

// Top 24 Most Well-Known Performing Companies (Global)
const topCompanies = [
  { id: 1, name: "Rolls-Royce", logo: "/images/logos/Rolls-Royce.png", category: "Automotive", tier: "PREMIUM", country: "UK" },
  { id: 2, name: "Fanta", logo: "/images/logos/2-removebg-preview.png", category: "Beverages", tier: "PREMIUM", country: "USA" },
  { id: 3, name: "Audi", logo: "/images/logos/3-removebg-preview.png", category: "Automotive", tier: "PREMIUM", country: "Germany" },
  { id: 4, name: "Adobe", logo: "/images/logos/4-removebg-preview.png", category: "Software", tier: "PREMIUM", country: "USA" },
  { id: 5, name: "Starbucks", logo: "/images/logos/5-removebg-preview.png", category: "Food & Beverage", tier: "PREMIUM", country: "USA" },
  { id: 6, name: "Jaguar", logo: "/images/logos/6-removebg-preview.png", category: "Automotive", tier: "PREMIUM", country: "UK" },
  { id: 7, name: "KFC", logo: "/images/logos/7-removebg-preview.png", category: "Food & Beverage", tier: "PREMIUM", country: "USA" },
  { id: 8, name: "Disney", logo: "/images/logos/8-removebg-preview.png", category: "Entertainment", tier: "PREMIUM", country: "USA" },
  { id: 9, name: "Bacardi", logo: "/images/logos/9-removebg-preview.png", category: "Beverages", tier: "PREMIUM", country: "Bermuda" },
  { id: 10, name: "Apple", logo: "/images/logos/10-removebg-preview.png", category: "Technology", tier: "PREMIUM", country: "USA" },
  { id: 11, name: "Microsoft", logo: "/images/logos/11-removebg-preview.png", category: "Technology", tier: "PREMIUM", country: "USA" },
  { id: 12, name: "Google", logo: "/images/logos/12-removebg-preview.png", category: "Technology", tier: "PREMIUM", country: "USA" },
  { id: 13, name: "Amazon", logo: "/images/logos/13-removebg-preview.png", category: "E-commerce", tier: "PREMIUM", country: "USA" },
  { id: 14, name: "Tesla", logo: "/images/logos/14-removebg-preview.png", category: "Automotive", tier: "PREMIUM", country: "USA" },
  { id: 15, name: "Meta", logo: "/images/logos/15-removebg-preview.png", category: "Social Media", tier: "PREMIUM", country: "USA" },
  { id: 16, name: "Netflix", logo: "/images/logos/16-removebg-preview.png", category: "Entertainment", tier: "PREMIUM", country: "USA" },
  { id: 17, name: "Samsung", logo: "/images/logos/17-removebg-preview.png", category: "Electronics", tier: "PREMIUM", country: "South Korea" },
  { id: 18, name: "Toyota", logo: "/images/logos/18-removebg-preview.png", category: "Automotive", tier: "PREMIUM", country: "Japan" },
  { id: 19, name: "Coca-Cola", logo: "/images/logos/19-removebg-preview.png", category: "Beverages", tier: "PREMIUM", country: "USA" },
  { id: 20, name: "Adidas", logo: "/images/logos/20-removebg-preview.png", category: "Sports", tier: "PREMIUM", country: "Germany" },
  { id: 21, name: "Lay's", logo: "/images/logos/21-removebg-preview.png", category: "Food & Snacks", tier: "PREMIUM", country: "USA" },
  { id: 22, name: "MTV", logo: "/images/logos/22-removebg-preview.png", category: "Entertainment", tier: "PREMIUM", country: "USA" },
  { id: 23, name: "BlackBerry", logo: "/images/logos/23-removebg-preview.png", category: "Technology", tier: "PREMIUM", country: "Canada" },
  { id: 24, name: "AT&T", logo: "/images/logos/24-removebg-preview.png", category: "Telecommunications", tier: "PREMIUM", country: "USA" },
  { id: 25, name: "Coca-Cola", logo: "/images/logos/19-removebg-preview.png", category: "Beverages", tier: "PREMIUM", country: "USA" },
];

export const SponsorWall = () => {
  const [activeLayer, setActiveLayer] = useState<Layer>(1);
  const [activeSlots, setActiveSlots] = useState<Set<number>>(new Set());
  const [hologramSlots, setHologramSlots] = useState<Set<number>>(new Set());
  const [arSlots, setArSlots] = useState<Set<number>>(new Set());
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const { toast } = useToast();

  // Backend data hooks
  const { companies, loading: companiesLoading } = useCompanies();
  const { slots, loading: slotsLoading } = useSlots();
  const { isHealthy, lastCheck } = useSystemHealth();

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
      // Layer 4: Only slots 8 and 24 spin automatically, no random spinning for other slots
      // No interval needed since only specific slots spin
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
    setSelectedSlot(null); // Clear selected slot when switching layers
    
    // Show toast notification
    const layerName = layerConfigs.find(l => l.id === layer)?.name;
    toast({
      title: `Layer ${layer} Activated`,
      description: `Switched to ${layerName} mode`,
    });
  };

  const getSponsorForSlot = (slotId: number) => {
    // First try to get from backend data
    if (Array.isArray(slots)) {
      const slot = slots.find(s => s.slotNumber === slotId);
      if (slot && slot.company) {
        return {
          id: slot.company.id,
          name: slot.company.name,
          logo: slot.company.logo,
          website: slot.company.website,
          description: slot.company.description,
          category: slot.company.category,
          tier: slot.company.tier,
        };
      }
    }
    
    // Fallback to top companies data (Kenyan & International)
    const company = topCompanies.find(c => c.id === slotId);
    if (company) {
      return {
        id: company.id,
        name: company.name,
        logo: company.logo,
        category: company.category,
        tier: company.tier,
        country: company.country,
        website: company.country === 'Kenya' 
          ? `https://${company.name.toLowerCase().replace(/\s+/g, '')}.co.ke`
          : `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
        description: `${company.name} - Leading ${company.category.toLowerCase()} company${company.country === 'Kenya' ? ' in Kenya' : ' globally'}`
      };
    }
    
    return null;
  };

  const handleSlotClick = (slotId: number) => {
    if (activeLayer === 1) {
      setSelectedSlot(slotId);
      const content = slotContent[slotId as keyof typeof slotContent];
      toast({
        title: `Slot ${slotId} Selected`,
        description: `Viewing content for ${content?.title}`,
      });
    } else if (activeLayer === 2) {
      setSelectedSlot(slotId);
      const content = hologramContent[slotId as keyof typeof hologramContent];
      toast({
        title: `Hologram ${slotId} Activated`,
        description: `Initializing ${content?.title} holographic projection`,
      });
    } else if (activeLayer === 3) {
      setSelectedSlot(slotId);
      const content = arContent[slotId as keyof typeof arContent];
      toast({
        title: `AR ${slotId} Engaged`,
        description: `Launching ${content?.title} augmented reality experience`,
      });
    } else if (activeLayer === 4) {
      setSelectedSlot(slotId);
      const content = spinningContent[slotId as keyof typeof spinningContent];
      toast({
        title: `Spinner ${slotId} Activated`,
        description: `Initiating ${content?.title} spinning animation sequence`,
      });
    } else {
      // For other layers, show a different message
      toast({
        title: `Layer ${activeLayer} Active`,
        description: `Slot interactions available in Layer 1 (Static), Layer 2 (Hologram), Layer 3 (AR), and Layer 4 (Spinning)`,
      });
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 ${activeLayer === 2 ? 'hologram-background' : ''} ${activeLayer === 3 ? 'ar-background' : ''}`} style={{ position: 'relative', zIndex: 10 }}>
      {/* Header Section */}
      <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            5D SPONSOR WALL — 24 SLOTS
          </h1>
          <p className="text-lg text-white/80">
            Single Wall • 5x5 Grid • Main Sponsor • 4K Beamer Ready
          </p>
      </div>
      {/* Hologram Video Background */}
      {activeLayer === 2 && (
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl" style={{ zIndex: -1 }}>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.2) 0%, rgba(0, 200, 255, 0.15) 30%, rgba(0, 0, 0, 0.9) 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(0, 150, 255, 0.4) 1px,
                  transparent 2px,
                  transparent 30px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(0, 200, 255, 0.4) 1px,
                  transparent 2px,
                  transparent 30px
                )
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%',
              animation: 'hologramFlow 6s ease-in-out infinite, hologramGrid 4s linear infinite'
            }}
          />
          {/* Additional blue neon grid overlay */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                linear-gradient(45deg, transparent 48%, rgba(0, 150, 255, 0.1) 49%, rgba(0, 150, 255, 0.1) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 200, 255, 0.1) 49%, rgba(0, 200, 255, 0.1) 51%, transparent 52%)
              `,
              backgroundSize: '40px 40px, 40px 40px',
              animation: 'hologramGrid 8s linear infinite'
            }}
          />
        </div>
      )}
      
      {/* AR Background */}
      {activeLayer === 3 && (
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl" style={{ zIndex: -1 }}>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.2) 0%, rgba(0, 200, 255, 0.15) 30%, rgba(0, 0, 0, 0.9) 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(0, 150, 255, 0.4) 1px,
                  transparent 2px,
                  transparent 30px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(0, 200, 255, 0.4) 1px,
                  transparent 2px,
                  transparent 30px
                )
              `,
              backgroundSize: '100% 100%, 100% 100%, 100% 100%',
              animation: 'hologramFlow 6s ease-in-out infinite, hologramGrid 4s linear infinite'
            }}
          />
          {/* Additional blue neon grid overlay */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                linear-gradient(45deg, transparent 48%, rgba(0, 150, 255, 0.1) 49%, rgba(0, 150, 255, 0.1) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 200, 255, 0.1) 49%, rgba(0, 200, 255, 0.1) 51%, transparent 52%)
              `,
              backgroundSize: '40px 40px, 40px 40px',
              animation: 'hologramGrid 8s linear infinite'
            }}
          />
        </div>
      )}

      {/* Loading Indicator */}
      {(companiesLoading || slotsLoading) && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
            <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
            Loading sponsor data...
          </div>
        </div>
      )}

      {/* Layer 3: 4x4 Product Grid (Using Saved Product Images) */}
      {activeLayer === 3 ? (
        <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center max-w-4xl mx-auto">
          {Array.from({ length: 16 }, (_, index) => {
            const slotId = index + 1;
            const arItem = arContent[slotId as keyof typeof arContent];
            const delay = index * 100; // Staggered animation delay
            const isActive = arSlots.has(slotId);

            return (
              <ProductOutline
                key={slotId}
                id={slotId}
                productType={arItem?.productType as 'sneaker' | 'handbag' | 'shoulderbag' | 'bottle' | 'sportsbottle' | 'phone' | 'earbuds' | 'powerbank'}
                isActive={isActive}
                delay={delay}
                onClick={() => handleSlotClick(slotId)}
                isSelected={selectedSlot === slotId}
              />
            );
          })}
        </div>
      ) : (
        /* Other Layers: 5x5 Grid (Layer 1: 25 slots, Others: 24 slots) */
        <div className="grid grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
        {Array.from({ length: activeLayer === 1 ? 25 : 24 }, (_, index) => {
            const slotId = index + 1;
            const sponsor = getSponsorForSlot(slotId);
          const delay = 0; // No animation delay for static slots

            // Determine slot state based on active layer
            let isActive = false;
            let slotMode = 'static';
            
            // Determine slot mode based on active layer
            if (activeLayer === 1) {
              slotMode = 'static';
            isActive = false;
            } else if (activeLayer === 2) {
              // Layer 2 uses hologram effects - all slots active
              slotMode = 'hologram';
              isActive = true;
            } else if (activeLayer === 4) {
            // In Layer 4, only slots 8 and 24 spin, others remain static
            // Slot 8: Samsung logo spinning
            // Slot 24: Slack logo spinning
            if (slotId === 8 || slotId === 24) {
              isActive = true;
              slotMode = 'spinning';
            } else {
              slotMode = 'static';
            }
          }

          // Special LIVE BIDDING slot at position 12 (only in Layer 1)
          if (slotId === 12 && activeLayer === 1) {
            return (
              <div
                key={slotId}
                className="relative h-20 w-32 md:h-24 md:w-40 lg:h-28 lg:w-44 bg-amber-800 rounded-lg border-2 border-amber-600 flex items-center justify-center cursor-pointer transition-none transform-gpu"
                style={{
                  transform: 'perspective(1000px) rotateX(1deg) rotateY(0deg) translateZ(5px)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)'
                }}
                onClick={() => handleSlotClick(slotId)}
              >
                <div 
                  className="text-white text-sm md:text-lg font-bold text-center"
                  style={{
                    transform: 'perspective(1000px) rotateX(2deg) rotateY(1deg) translateZ(10px)',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  LIVE BIDDING
                </div>
              </div>
            );
          }

          // Use SpinningSlot for spinning mode, SponsorSlot for others
            if (slotMode === 'spinning') {
              return (
                <SpinningSlot
                  key={slotId}
                  id={slotId}
                  sponsor={sponsor ? {
                    name: sponsor.name,
                    logo: sponsor.logo,
                    product: sponsor.logo, // Use logo as product for AR effect
                    mascot: sponsor.logo   // Use logo as mascot for AR effect
                  } : undefined}
                  isActive={isActive}
                  delay={delay}
                  onClick={() => handleSlotClick(slotId)}
                  isSelected={selectedSlot === slotId}
                  spinDuration={3000 + Math.random() * 2000} // 3-5 seconds
                  rotationDegrees={180 + Math.random() * 180} // 180-360 degrees
                />
              );
            }

            return (
              <SponsorSlot
                key={slotId}
                id={slotId}
                sponsor={sponsor}
                isActive={isActive}
                delay={delay}
                mode={slotMode as 'static' | 'hologram' | 'ar' | 'spinning'}
                onClick={() => handleSlotClick(slotId)}
                isSelected={selectedSlot === slotId}
              />
            );
          })}
        </div>





      )}

      {/* Layer 1 Content Display Panel */}
      {selectedSlot && activeLayer === 1 && (() => {
        const sponsor = getSponsorForSlot(selectedSlot);
        return (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-secondary/20 rounded-xl p-6 border border-gold/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gold flex items-center gap-3">
                  {sponsor?.logo && (
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  {sponsor?.name || `Slot ${selectedSlot}`}
                </h3>
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="text-muted-foreground text-base">
                  {sponsor?.description || `Company information for slot ${selectedSlot}`}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gold">Category:</span>
                  <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                    {sponsor?.category || 'Unknown'}
                  </span>
                  {sponsor?.country && (
                    <>
                      <span className="text-sm font-medium text-gold">Country:</span>
                      <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                        {sponsor.country}
                      </span>
                    </>
                  )}
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="text-sm font-medium text-gold mb-2">Company Information</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Slot Number: {selectedSlot}</div>
                    <div>• Company: {sponsor?.name || 'Not assigned'}</div>
                    <div>• Tier: {sponsor?.tier || 'Unknown'}</div>
                    <div>• Layer: 1 (Static Display)</div>
                    {sponsor?.website && (
                      <div>• Website: <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{sponsor.website}</a></div>
                    )}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-3">
                    💡 Click other slots to explore more companies • Use layer controls to switch display modes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="text-xs bg-secondary/50 hover:bg-secondary/70 px-3 py-1 rounded-full transition-colors"
                    >
                      Close Panel
                    </button>
                    <button
                      onClick={() => {
                        const nextSlot = selectedSlot === 24 ? 1 : selectedSlot + 1;
                        setSelectedSlot(nextSlot);
                      }}
                      className="text-xs bg-gold/20 hover:bg-gold/30 text-gold px-3 py-1 rounded-full transition-colors"
                    >
                      Next Company →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Layer 2 Static Content Display Panel */}
      {selectedSlot && activeLayer === 2 && (
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-pink-500/20 rounded-xl p-6 border border-pink-400/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gold flex items-center gap-3">
                <span className="text-2xl">{slotContent[selectedSlot as keyof typeof slotContent]?.icon}</span>
                {slotContent[selectedSlot as keyof typeof slotContent]?.title}
              </h3>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-muted-foreground text-base">
                {slotContent[selectedSlot as keyof typeof slotContent]?.description}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gold">Category:</span>
                <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                  {slotContent[selectedSlot as keyof typeof slotContent]?.category}
                </span>
              </div>
              <div className="bg-gold/20 rounded-lg p-4">
                <div className="text-sm font-medium text-gold mb-2">Slot Information</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Slot ID: S{selectedSlot.toString().padStart(2, '0')}</div>
                  <div>• Layer: 2 (Hologram Effects)</div>
                  <div>• Display Type: Static</div>
                  <div>• Status: Active Static Display</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground mb-3">
                  📺 Click other slots to explore more content • Use layer controls to switch display modes
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="text-xs bg-pink-500/50 hover:bg-pink-500/70 px-3 py-1 rounded-full transition-colors"
                  >
                    Close Projection
                  </button>
                  <button
                    onClick={() => {
                      const nextSlot = selectedSlot === 24 ? 1 : selectedSlot + 1;
                      setSelectedSlot(nextSlot);
                    }}
                    className="text-xs bg-pink-400/20 hover:bg-pink-400/30 text-pink-200 px-3 py-1 rounded-full transition-colors"
                  >
                    Next Hologram →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 3 Static Content Display Panel */}
      {selectedSlot && activeLayer === 3 && (
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gold flex items-center gap-3">
                <span className="text-2xl">{slotContent[selectedSlot as keyof typeof slotContent]?.icon}</span>
                {slotContent[selectedSlot as keyof typeof slotContent]?.title}
              </h3>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-muted-foreground text-base">
                {slotContent[selectedSlot as keyof typeof slotContent]?.description}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gold">Category:</span>
                <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                  {slotContent[selectedSlot as keyof typeof slotContent]?.category}
                </span>
              </div>
              <div className="bg-gold/20 rounded-lg p-4">
                <div className="text-sm font-medium text-gold mb-2">Slot Information</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Slot ID: S{selectedSlot.toString().padStart(2, '0')}</div>
                  <div>• Layer: 3 (AR)</div>
                  <div>• Display Type: Static</div>
                  <div>• Status: Active Static Display</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground mb-3">
                  📺 Click other slots to explore more content • Use layer controls to switch display modes
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="text-xs bg-gold/50 hover:bg-gold/70 px-3 py-1 rounded-full transition-colors"
                  >
                    Close Slot
                  </button>
                  <button
                    onClick={() => {
                      const nextSlot = selectedSlot === 24 ? 1 : selectedSlot + 1;
                      setSelectedSlot(nextSlot);
                    }}
                    className="text-xs bg-green-400/20 hover:bg-green-400/30 text-green-200 px-3 py-1 rounded-full transition-colors"
                  >
                    Next AR Experience →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layer 4 Spinning Content Display Panel */}
      {selectedSlot && activeLayer === 4 && (
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gold/20 rounded-xl p-6 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gold flex items-center gap-3">
                <span className="text-2xl">{spinningContent[selectedSlot as keyof typeof spinningContent]?.icon}</span>
                {spinningContent[selectedSlot as keyof typeof spinningContent]?.title}
              </h3>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-muted-foreground text-base">
                {spinningContent[selectedSlot as keyof typeof spinningContent]?.description}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gold">Spinner Category:</span>
                <span className="text-sm bg-gold/20 text-gold px-3 py-1 rounded-full">
                  {spinningContent[selectedSlot as keyof typeof spinningContent]?.category}
                </span>
              </div>
              <div className="bg-gold/30 rounded-lg p-4">
                <div className="text-sm font-medium text-gold mb-2">Spinning Animation Details</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Spinner ID: SP{selectedSlot.toString().padStart(2, '0')}</div>
                  <div>• Layer: 4 (Spinning Animation)</div>
                  <div>• Effect Type: {spinningContent[selectedSlot as keyof typeof spinningContent]?.effect}</div>
                  <div>• Status: Spinning Animation Active</div>
                  <div>• Rotation: 180°-360° smooth rotation</div>
                  <div>• Duration: 3-5 seconds per spin</div>
                </div>
              </div>
              <div className="bg-gold/20 rounded-lg p-4">
                <div className="text-sm font-medium text-gold mb-2">Multi-Layer Effects</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Layer 1: Core sponsor logo (always visible with glow outline)</div>
                  <div>• Layer 2: Hologram effects (floating particles, laser lines)</div>
                  <div>• Layer 3: AR effects (orbiting products/mascots)</div>
                  <div>• Layer 4: Spinning animation (smooth rotation with glow sweep)</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground mb-3">
                  ⚡ Click other slots to explore more spinning animations • Use layer controls to switch display modes
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="text-xs bg-gold/50 hover:bg-gold/70 px-3 py-1 rounded-full transition-colors"
                  >
                    Stop Spinner
                  </button>
                  <button
                    onClick={() => {
                      const nextSlot = selectedSlot === 24 ? 1 : selectedSlot + 1;
                      setSelectedSlot(nextSlot);
                    }}
                    className="text-xs bg-gold/20 hover:bg-gold/30 text-gold px-3 py-1 rounded-full transition-colors"
                  >
                    Next Spinner →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};