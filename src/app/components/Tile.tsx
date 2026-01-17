import { useState } from "react";
import { Card, CardActionArea, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface TileProps {
  color: string;
  index: number;
  onClick: () => void;
  previewImage?: string;
}

export function Tile({ color, index, onClick, previewImage }: TileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  
  // Tiles that should NOT show preview on hover (indices 5, 6, 8 = tiles 6, 7, 9)
  const noPreviewIndices = [5, 6, 8];
  const shouldShowPreview = previewImage && !noPreviewIndices.includes(index);

  return (
    <Card
      elevation={isHovered ? 8 : 2} // Material Design elevation
      sx={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: 1, // 4px per Material Design
        overflow: 'hidden',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.standard,
        }),
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        position: 'relative',
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.07) 100%), linear-gradient(90deg, ${color} 0%, ${color} 100%)`,
        '&:hover': {
          '& .MuiCardActionArea-focusHighlight': {
            opacity: 0.1,
          },
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Material Design ripple effect is built into CardActionArea */}
        
        {/* Illumination overlay effect */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            transition: theme.transitions.create('opacity'),
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
            opacity: isHovered ? 1 : 0,
          }}
        />
        
        {/* Glass effect preview on hover */}
        {shouldShowPreview && isHovered && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Frosted glass overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(8px)',
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              }}
            />
            
            {/* Preview image */}
            <Box
              component="img"
              src={previewImage}
              alt={`Preview ${index + 1}`}
              sx={{
                position: 'relative',
                zIndex: 10,
                width: '80%',
                height: '80%',
                objectFit: 'cover',
                borderRadius: 0.5,
                boxShadow: theme.shadows[8],
              }}
            />
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
}