import React from 'react';

interface ProductOutlineProps {
  id: number;
  productType: 'sneaker' | 'handbag' | 'shoulderbag' | 'bottle' | 'sportsbottle' | 'phone' | 'earbuds' | 'powerbank';
  isActive?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  delay?: number;
}

export const ProductOutline: React.FC<ProductOutlineProps> = ({
  id,
  productType,
  isActive = false,
  onClick,
  isSelected = false,
  delay = 0
}) => {
  const getProductImage = () => {
    // All available PNG images in the directory
    const allAvailableImages = [
      '/images/products/sneaker.png',
      '/images/products/sneaker (2).png',
      '/images/products/sneaker (3).png',
      '/images/products/handbag.png',
      '/images/products/handbag (2).png',
      '/images/products/handbag (3).png',
      '/images/products/phone.png'
    ];

    // Map product types to use available images
    const imageMap = {
      'sneaker': [
        '/images/products/sneaker.png',
        '/images/products/sneaker (2).png',
        '/images/products/sneaker (3).png'
      ],
      'handbag': [
        '/images/products/handbag.png',
        '/images/products/handbag (2).png',
        '/images/products/handbag (3).png'
      ],
      'shoulderbag': [
        '/images/products/handbag.png',
        '/images/products/handbag (2).png',
        '/images/products/handbag (3).png'
      ],
      'bottle': [
        '/images/products/phone.png', // Use phone for bottles
        '/images/products/sneaker.png', // Use sneaker as alternative
        '/images/products/handbag.png' // Use handbag as alternative
      ],
      'sportsbottle': [
        '/images/products/phone.png', // Use phone for sports bottles
        '/images/products/sneaker (2).png', // Use sneaker variation
        '/images/products/handbag (2).png' // Use handbag variation
      ],
      'phone': [
        '/images/products/phone.png'
      ],
      'earbuds': [
        '/images/products/phone.png', // Use phone for earbuds
        '/images/products/sneaker (3).png', // Use sneaker variation
        '/images/products/handbag (3).png' // Use handbag variation
      ],
      'powerbank': [
        '/images/products/phone.png', // Use phone for powerbank
        '/images/products/sneaker.png', // Use sneaker as alternative
        '/images/products/handbag.png' // Use handbag as alternative
      ],
    };

    const imagePaths = imageMap[productType];
    
    if (!imagePaths || imagePaths.length === 0) {
      // Fallback: use any available image based on slot ID
      const fallbackIndex = (id - 1) % allAvailableImages.length;
      const fallbackPath = allAvailableImages[fallbackIndex];
      
      return (
        <img
          src={fallbackPath}
          alt={`${productType} product`}
          className="w-full h-full object-contain"
          style={{
            filter: isActive 
              ? 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))' 
              : 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))'
          }}
          onError={(e) => {
            // Try next available image if current one fails
            const currentIndex = allAvailableImages.indexOf(fallbackPath);
            const nextIndex = (currentIndex + 1) % allAvailableImages.length;
            if (nextIndex !== currentIndex) {
              e.currentTarget.src = allAvailableImages[nextIndex];
            } else {
              // Final fallback to emoji
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }
          }}
        />
      );
    }

    // Use the first available image, or cycle through based on slot ID for variety
    const imageIndex = (id - 1) % imagePaths.length;
    const imagePath = imagePaths[imageIndex];

    return (
      <img
        src={imagePath}
        alt={`${productType} product`}
        className="w-full h-full object-contain"
        style={{
          filter: isActive 
            ? 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8))' 
            : 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.4))'
        }}
        onError={(e) => {
          // Try next image in the array if current one fails
          const currentIndex = imagePaths.indexOf(imagePath);
          const nextIndex = (currentIndex + 1) % imagePaths.length;
          if (nextIndex !== currentIndex) {
            e.currentTarget.src = imagePaths[nextIndex];
          } else {
            // Try any available image as final fallback
            const fallbackIndex = (id - 1) % allAvailableImages.length;
            e.currentTarget.src = allAvailableImages[fallbackIndex];
          }
        }}
      />
    );
  };

  const getFallbackSVG = () => {
    // Fallback SVG in case PNG images are not available
    return (
      <div className="w-full h-full flex items-center justify-center text-cyan-300">
        <div className="text-4xl">
          {productType === 'sneaker' && '👟'}
          {productType === 'handbag' && '👜'}
          {productType === 'shoulderbag' && '👜'}
          {productType === 'bottle' && '💧'}
          {productType === 'sportsbottle' && '🏃'}
          {productType === 'phone' && '📱'}
          {productType === 'earbuds' && '🎧'}
          {productType === 'powerbank' && '🔋'}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
        relative w-full h-32 md:h-40 flex flex-col items-center justify-center
        cursor-pointer transition-all duration-500 ease-out
        ${isActive ? 'animate-pulse' : ''}
        ${isSelected ? 'scale-110' : 'hover:scale-105'}
      `}
      style={{
        animationDelay: `${delay}ms`,
        animation: isActive ? 'productGlow 2s ease-in-out infinite' : undefined
      }}
      onClick={onClick}
    >
      {/* Product Image Container - PNG Images */}
      <div className={`
        relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center
        transition-all duration-300
        ${isActive 
          ? 'drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]' 
          : 'drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]'
        }
        ${isSelected ? 'drop-shadow-[0_0_25px_rgba(34,211,238,1)]' : ''}
      `}>
        {getProductImage()}
        <div className="hidden w-full h-full">
          {getFallbackSVG()}
        </div>
        
        {/* Glow Effect Overlay - Exact mockup glow */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
        )}
      </div>

      {/* Product Label - Exact mockup text */}
      <div className={`
        mt-2 text-xs md:text-sm font-medium tracking-wider
        transition-all duration-300
        ${isActive 
          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
          : 'text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.3)]'
        }
        ${isSelected ? 'text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]' : ''}
      `}>
        SPONSOR PRODUCT
      </div>

      {/* Holographic Grid Overlay - Exact mockup style */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(45deg, transparent 48%, rgba(34, 211, 238, 0.1) 49%, rgba(34, 211, 238, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(34, 211, 238, 0.1) 49%, rgba(34, 211, 238, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '20px 20px, 20px 20px',
            animation: 'hologramGrid 4s linear infinite'
          }}
        />
      </div>

      {/* Slot Number Indicator */}
      <div className="absolute top-1 right-1 text-xs text-cyan-400/60 font-mono">
        {id}
      </div>
    </div>
  );
};

// Add CSS animations - Exact mockup effects
const style = document.createElement('style');
style.textContent = `
  @keyframes productGlow {
    0%, 100% {
      filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.8));
    }
  }
  
  @keyframes hologramGrid {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(20px, 20px);
    }
  }
`;
document.head.appendChild(style);
