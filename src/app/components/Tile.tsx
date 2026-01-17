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
        w-full h-full rounded-[4px] cursor-pointer relative overflow-hidden
        transition-all duration-300 ease-out
        ${isHovered ? 'shadow-[0_6px_14px_rgba(0,0,0,0.35)]' : 'shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_rgba(0,0,0,0.14),0px_1px_5px_rgba(0,0,0,0.12)]'}
      `}
      style={{ 
        backgroundColor: color,
        filter: isHovered ? 'saturate(1.05) brightness(1.02)' : 'saturate(1) brightness(1)'
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
          bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.07)_100%)]
          ${isHovered ? 'opacity-90' : 'opacity-100'}
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
