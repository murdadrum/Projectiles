import { useRef, useState, useEffect } from "react";
import { Card, CardActionArea, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import tile1Image from '../../assets/Tile Images/Tile1.png';
import tile5Image from '../../assets/Tile Images/Tile5.png';
import tile15Image from '../../assets/Tile Images/Tile15.png';
import tile16Image from '../../assets/Tile Images/Tile16.png';

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

// Back-face images are the tile preview assets when provided.

export function Tile({ color, index, onClick, previewImage, mousePosition, prevMousePosition, isActiveHover, onTileHoverChange, initialFlipped, cascadeDelay, onInitialFlipComplete, isTouchFlipped, isTouchDevice }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [flipDirection, setFlipDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [showingBack, setShowingBack] = useState(initialFlipped || false);
  const [showAfterglow, setShowAfterglow] = useState(false);
  const shouldShowPreview = !!previewImage;

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
      data-testid={`tile-${index}`}
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
              src={previewImage ?? (index === 15 ? tile16Image : index === 14 ? tile15Image : index === 0 ? tile1Image : index === 4 ? tile5Image : tile1Image)}
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
