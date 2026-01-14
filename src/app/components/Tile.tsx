import { useState } from "react";

interface TileProps {
  color: string;
  index: number;
  onClick: () => void;
  previewImage?: string;
}

export function Tile({ color, index, onClick, previewImage }: TileProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Tiles that should NOT show preview on hover (indices 5, 6, 8 = tiles 6, 7, 9)
  const noPreviewIndices = [5, 6, 8];
  const shouldShowPreview = previewImage && !noPreviewIndices.includes(index);

  return (
    <div 
      className={`
        w-full aspect-square rounded-lg cursor-pointer relative overflow-hidden
        transition-all duration-300 ease-out
        border-2 border-white/10
        ${isHovered ? 'shadow-[0_0_15px_8px] border-white/30' : 'shadow-md'}
      `}
      style={{ 
        backgroundColor: color,
        filter: isHovered ? 'saturate(1.2) brightness(1.05)' : 'saturate(1) brightness(1)',
        boxShadow: isHovered ? `0 0 8px 4px ${color}` : undefined
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Illumination overlay effect */}
      <div 
        className={`
          absolute inset-0 pointer-events-none
          transition-opacity duration-300
          bg-gradient-to-br from-white/20 via-transparent to-transparent
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />
      
      {/* Glass effect preview on hover */}
      {shouldShowPreview && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Frosted glass overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
          
          {/* Preview image */}
          <img 
            src={previewImage} 
            alt={`Preview ${index + 1}`}
            className="relative z-10 w-4/5 h-4/5 object-cover rounded-md shadow-xl"
          />
        </div>
      )}
    </div>
  );
}