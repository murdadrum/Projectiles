import { useRef, useState, useEffect } from "react";
import { Card, CardActionArea, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import tile1Image from 'figma:asset/b13b88acf880894056f5c2f379c5092525703b34.png';
import tile5Image from 'figma:asset/a50fe4659419b19780efd331617efb8b5bb21be6.png';
import tile16Image from 'figma:asset/c1e517fc5ebf0047a4e6772359aeddd658d3402f.png';

interface TileProps {
  color: string;
  index: number;
  onClick: () => void;
  previewImage?: string;
  mousePosition: { x: number; y: number } | null;
  prevMousePosition: { x: number; y: number } | null;
  isActiveHover?: boolean;
  onTileHoverChange?: (isHovering: boolean) => void;
  initialFlipped?: boolean;
  cascadeDelay?: number;
  onInitialFlipComplete?: () => void;
  isTouchFlipped?: boolean;
  isTouchDevice?: boolean;
}

// Placeholder images for the back of tiles
const placeholderImages = [
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY4OTcxNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1665764884116-11bf71512155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGdyYWRpZW50JTIwYXJ0fGVufDF8fHx8MTc2ODk3MTQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1704428381440-ae3d3b758a0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwZGVzaWdufGVufDF8fHx8MTc2ODkzMjk1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1688413709025-5f085266935a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0d29yayUyMHBhdHRlcm58ZW58MXx8fHwxNzY4OTcxNDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3Njg5NzE0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNoYXBlcyUyMGRlc2lnbnxlbnwxfHx8fDE3Njg4ODgzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1558770735-10c8dd635e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGNvbXBvc2l0aW9ufGVufDF8fHx8MTc2ODk3NzQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1622986819498-60765a6e52c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwY29sb3JzJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY4ODkxNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1631295285425-ee8ddc8b3b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njg5NzE0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1692530943891-589e88b780a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGJhY2tncm91bmQlMjBwYXR0ZXJufGVufDF8fHx8MTc2ODk3MTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1630388740756-6fe7ca15f806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdGV4dHVyZSUyMGRlc2lnbnxlbnwxfHx8fDE3Njg5NzE0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1536241455566-5709c3aefd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBhYnN0cmFjdHxlbnwxfHx8fDE3Njg5NzE0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1759265686020-0e69c0f2bc9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwcGF0dGVybnxlbnwxfHx8fDE3Njg5NzE0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1640735853641-5d799222afbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRleHR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2ODk3MTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1748186673815-7f015a99a8e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBhcnQlMjBkZXNpZ258ZW58MXx8fHwxNzY4OTcxNDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1611087966028-bc70bc75d5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHZpc3VhbCUyMGFydHxlbnwxfHx8fDE3Njg5NzE0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function Tile({ color, index, onClick, previewImage, mousePosition, prevMousePosition, isActiveHover, onTileHoverChange, initialFlipped, cascadeDelay, onInitialFlipComplete, isTouchFlipped, isTouchDevice }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showingBack, setShowingBack] = useState(initialFlipped || false);
  const [showAfterglow, setShowAfterglow] = useState(false);
  
  // Tiles that should NOT show preview on hover (indices 5, 6, 8 = tiles 6, 7, 9)
  const noPreviewIndices = [5, 6, 8];
  const shouldShowPreview = previewImage && !noPreviewIndices.includes(index);

  // On touch devices, override showingBack with isTouchFlipped state
  const effectiveShowingBack = isTouchDevice ? isTouchFlipped : showingBack;

  // Calculate if this tile is a neighbor of the hovered tile (disabled on touch)
  const isNeighbor = () => {
    if (isTouchDevice || !mousePosition || !tileRef.current || isActiveHover) return false;
    
    const rect = tileRef.current.getBoundingClientRect();
    const gridRect = tileRef.current.parentElement?.getBoundingClientRect();
    
    if (!gridRect) return false;

    // Calculate tile center relative to grid
    const tileCenterX = rect.left - gridRect.left + rect.width / 2;
    const tileCenterY = rect.top - gridRect.top + rect.height / 2;

    // Calculate distance from mouse to tile center
    const deltaX = mousePosition.x - tileCenterX;
    const deltaY = mousePosition.y - tileCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Check if within neighbor radius (1.2 tile widths)
    const neighborRadius = rect.width * 1.2;
    
    return distance > 0 && distance <= neighborRadius;
  };

  const shouldBounce = isNeighbor();

  // Handle initial cascade flip animation
  useEffect(() => {
    if (initialFlipped) {
      // Wait for cascade delay, then flip to front (colored) side
      const timer = setTimeout(() => {
        setShowingBack(false);
        // Notify when flip completes
        if (onInitialFlipComplete) {
          setTimeout(() => {
            onInitialFlipComplete();
          }, 400); // Match animation duration
        }
      }, cascadeDelay || 0);
      
      return () => clearTimeout(timer);
    }
  }, [initialFlipped, cascadeDelay, onInitialFlipComplete]);

  // Determine approach direction when hovering starts
  useEffect(() => {
    if (isActiveHover && mousePosition && prevMousePosition && tileRef.current) {
      const rect = tileRef.current.getBoundingClientRect();
      const gridRect = tileRef.current.parentElement?.getBoundingClientRect();
      
      if (!gridRect) return;

      // Get tile center
      const tileCenterX = rect.left - gridRect.left + rect.width / 2;
      const tileCenterY = rect.top - gridRect.top + rect.height / 2;

      // Calculate movement vector
      const deltaX = Math.abs(mousePosition.x - prevMousePosition.x);
      const deltaY = Math.abs(mousePosition.y - prevMousePosition.y);

      // Calculate position relative to tile
      const posX = mousePosition.x - tileCenterX;
      const posY = mousePosition.y - tileCenterY;

      // Determine primary approach direction
      // If movement is more horizontal OR pointer is on left/right edge
      const isHorizontalMovement = deltaX > deltaY;
      const isOnHorizontalEdge = Math.abs(posX) > Math.abs(posY);
      
      const newDirection = (isHorizontalMovement || isOnHorizontalEdge) ? 'horizontal' : 'vertical';
      
      // Only update if direction actually changed
      setFlipDirection(prev => prev === newDirection ? prev : newDirection);
    }
  }, [isActiveHover]); // Only run when hover state changes, not on every mouse move

  // Trigger afterglow when tile flips back from back to front
  useEffect(() => {
    // Check if we just transitioned from showing back to showing front (flip back event)
    if (!showingBack && !isActiveHover) {
      setShowAfterglow(true);
      
      // Fade out afterglow after 400ms
      const timer = setTimeout(() => {
        setShowAfterglow(false);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [showingBack, isActiveHover]);

  // Calculate proximity-based rotation
  const getProximityRotation = () => {
    // If this is the actively hovered tile, force it to flip completely based on direction
    if (isActiveHover) {
      if (flipDirection === 'horizontal') {
        return { rotateX: 0, rotateY: 180, isFlipped: true };
      } else {
        return { rotateX: 180, rotateY: 0, isFlipped: true };
      }
    }

    if (!mousePosition || !tileRef.current) {
      return { rotateX: 0, rotateY: 0, isFlipped: false };
    }

    const rect = tileRef.current.getBoundingClientRect();
    const gridRect = tileRef.current.parentElement?.getBoundingClientRect();
    
    if (!gridRect) {
      return { rotateX: 0, rotateY: 0, isFlipped: false };
    }

    // Calculate tile center relative to grid
    const tileCenterX = rect.left - gridRect.left + rect.width / 2;
    const tileCenterY = rect.top - gridRect.top + rect.height / 2;

    // Calculate distance from mouse to tile center
    const deltaX = mousePosition.x - tileCenterX;
    const deltaY = mousePosition.y - tileCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Reduced influence radius - only affects immediate neighbors
    const maxRadius = rect.width * 1.2;
    
    if (distance > maxRadius) {
      return { rotateX: 0, rotateY: 0, isFlipped: false };
    }

    // Calculate proximity factor (1 at center, 0 at max radius)
    const proximityFactor = 1 - (distance / maxRadius);
    
    // Subtle rotation for neighboring tiles
    const maxRotation = 8; // Reduced from 35 to 8 degrees for subtle effect
    const rotateY = (deltaX / rect.width) * maxRotation * proximityFactor;
    const rotateX = -(deltaY / rect.height) * maxRotation * proximityFactor;

    // Neighboring tiles don't flip, only the directly hovered tile flips
    const isFlipped = false;

    return { rotateX, rotateY, isFlipped };
  };

  const { rotateX, rotateY } = getProximityRotation();

  // Calculate the final transform based on showingBack state and proximity rotation
  const getFinalTransform = () => {
    if (effectiveShowingBack) {
      // When showing back, flip 180 degrees (override proximity rotation)
      return flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)';
    } else {
      // Normal proximity-based rotation
      return `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  return (
    <Box
      ref={tileRef}
      sx={{
        width: '100%',
        aspectRatio: '1',
        perspective: '1000px',
        // Apply bounce animation to neighboring tiles
        animation: shouldBounce ? 'bounce 0.5s ease-out' : 'none',
        '@keyframes bounce': {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-5.6px)' },
          '50%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-2.8px)' },
          '100%': { transform: 'translateY(0)' },
        },
      }}
      onMouseEnter={() => onTileHoverChange?.(true)}
      onMouseLeave={() => onTileHoverChange?.(false)}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: getFinalTransform(),
          transition: theme.transitions.create(['transform'], {
            duration: effectiveShowingBack || isActiveHover ? 400 : theme.transitions.duration.shorter,
            easing: effectiveShowingBack || isActiveHover ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : theme.transitions.easing.easeOut,
          }),
        }}
      >
        {/* Front face - colored tile */}
        <Card
          elevation={effectiveShowingBack ? 2 : (isActiveHover ? 8 : 2)}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 1,
            overflow: 'hidden',
            background: `linear-gradient(90deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.07) 100%), linear-gradient(90deg, ${color} 0%, ${color} 100%)`,
            // Afterglow effect - inner glow using bright white light
            boxShadow: showAfterglow 
              ? `inset 0 0 48px 16px rgba(255, 255, 255, 0.54), inset 0 0 96px 32px rgba(255, 255, 255, 0.36), inset 0 0 128px 48px rgba(255, 255, 255, 0.18)` 
              : 'none',
            transition: theme.transitions.create(['box-shadow'], {
              duration: 400,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }),
            '&:hover': {
              '& .MuiCardActionArea-focusHighlight': {
                opacity: 0.1,
              },
            },
          }}
        >
          <CardActionArea
            onClick={onClick}
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Illumination overlay effect */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                transition: theme.transitions.create('opacity'),
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                opacity: isActiveHover ? 1 : 0,
              }}
            />
          </CardActionArea>
        </Card>

        {/* Back face - placeholder image (horizontal flip) */}
        <Card
          elevation={effectiveShowingBack ? 8 : 2}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <CardActionArea
            onClick={onClick}
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={index === 15 ? tile16Image : index === 0 ? tile1Image : index === 4 ? tile5Image : placeholderImages[index]}
              alt={`Tile ${index + 1} back`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}