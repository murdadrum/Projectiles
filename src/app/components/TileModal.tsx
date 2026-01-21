import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Dialog,
  IconButton,
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface TileModalProps {
  color: string;
  index: number;
  totalTiles: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  previewImage?: string;
  tileInfo?: {
    title: string;
    subtitle?: string;
    description: string;
    details: string[];
    techStack: string[];
    embedUrl?: string;
  };
  gridBounds: DOMRect | null;
}

export function TileModal({ color, index, totalTiles, onClose, onNext, onPrev, previewImage, tileInfo, gridBounds }: TileModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth={false}
      fullWidth={false}
      fullScreen={false}
      PaperProps={{
        elevation: 24, // Material Design maximum elevation
        sx: gridBounds ? {
          bgcolor: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(24px)',
          backgroundImage: 'none',
          borderRadius: 1,
          position: 'absolute',
          top: `${gridBounds.top}px`,
          left: `${gridBounds.left}px`,
          width: `${gridBounds.width}px`,
          height: `${gridBounds.height}px`,
          m: 0,
          maxWidth: 'none',
          maxHeight: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        } : {
          bgcolor: theme.palette.background.default,
          backgroundImage: 'none',
          m: { xs: 0, md: 4 },
          borderRadius: { xs: 0, md: 1 },
          height: { xs: '100%', md: 'calc(100% - 64px)' },
          maxHeight: { xs: '100%', md: 'calc(100% - 64px)' },
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          zIndex: 60,
          color: 'rgba(255, 255, 255, 0.7)',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Navigation Buttons */}
      <IconButton
        onClick={onPrev}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 60,
          color: 'rgba(255, 255, 255, 0.7)',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <IconButton
        onClick={onNext}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 16 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 60,
          color: 'rgba(255, 255, 255, 0.7)',
          bgcolor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
          },
        }}
      >
        <ArrowForwardIcon />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {tileInfo ? (
          /* Project Layout with Info */
          <>
            {/* DESKTOP ONLY: COMPONENT / IMAGE COLUMN (Right side) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: { md: '66.666%' },
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                flexDirection: 'column',
                flexShrink: 0,
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
              }}
            >
              {tileInfo.embedUrl || previewImage ? (
                <Box sx={{ position: 'relative', flex: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {/* Inner Container */}
                  <Paper
                    elevation={8}
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 0.5,
                      overflow: 'hidden',
                      bgcolor: theme.palette.background.default,
                      position: 'relative',
                    }}
                  >
                    {tileInfo.embedUrl ? (
                      <iframe
                        src={tileInfo.embedUrl}
                        className="w-full h-full border-0"
                        title={tileInfo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                        style={{ border: 0, width: '100%', height: '100%' }}
                      />
                    ) : previewImage ? (
                      <Box
                        component="img"
                        src={previewImage}
                        alt={tileInfo.title}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                  </Paper>
                </Box>
              ) : null}

              {/* Desktop Footer */}
              <Box
                sx={{
                  bgcolor: '#050505',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Powered by React + Vite
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {tileInfo.techStack.join(' • ')}
                </Typography>
              </Box>
            </Box>

            {/* TEXT COLUMN (Full width on mobile, 1/3 on desktop) */}
            <Box
              sx={{
                width: { xs: '100%', md: '33.333%' },
                p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                bgcolor: 'rgba(10, 10, 10, 0.95)',
                flexShrink: 0,
                overflowY: 'auto',
              }}
            >
              <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3, lg: 4 } }}>
                {tileInfo.subtitle && (
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      letterSpacing: '0.15em',
                      display: 'block',
                      mb: { xs: 0.5, sm: 0.75, md: 1 },
                      fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' },
                    }}
                  >
                    {tileInfo.subtitle}
                  </Typography>
                )}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 300,
                    mb: { xs: 1.5, sm: 1.75, md: 2 },
                    color: 'text.primary',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {tileInfo.title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.75, md: 1 }, mb: { xs: 2, sm: 2.5, md: 3 } }}>
                  {tileInfo.techStack.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: { xs: '0.5625rem', sm: '0.5938rem', md: '0.625rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        height: { xs: 20, sm: 22, md: 24 },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Mobile: Link to open app */}
              {tileInfo.embedUrl && (
                <Button
                  href={tileInfo.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  fullWidth
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    py: { xs: 1.25, sm: 1.5 },
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                  }}
                >
                  Launch App
                </Button>
              )}

              {/* About the Project */}
              {(tileInfo.description || tileInfo.details) && (
                <Box sx={{ mb: { xs: 2.5, sm: 3, md: 3.5, lg: 4 } }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'text.secondary',
                      opacity: 0.4,
                      letterSpacing: '0.15em',
                      display: 'block',
                      mb: { xs: 1.25, sm: 1.5, md: 2 },
                      fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' },
                    }}
                  >
                    About the Project
                  </Typography>
                  {tileInfo.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        opacity: 0.7,
                        lineHeight: 1.6,
                        pl: { xs: 1.5, md: 2 },
                        borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                        mb: { xs: 1.5, md: 2 },
                        fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' },
                      }}
                    >
                      {tileInfo.description}
                    </Typography>
                  )}
                  {tileInfo.details && tileInfo.details.length > 0 && (
                    <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
                      {tileInfo.details.map((bullet, i) => (
                        <Typography
                          key={i}
                          component="li"
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            opacity: 0.6,
                            lineHeight: 1.6,
                            pl: { xs: 1.5, md: 2 },
                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                            mb: { xs: 1.25, md: 1.5 },
                            fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' },
                          }}
                        >
                          {bullet}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

              {/* Engineering Context */}
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'text.secondary',
                    opacity: 0.4,
                    letterSpacing: '0.15em',
                    display: 'block',
                    mb: { xs: 1.25, sm: 1.5, md: 2 },
                    fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' },
                  }}
                >
                  Engineering
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    opacity: 0.6, 
                    lineHeight: 1.6, 
                    mb: { xs: 0.75, md: 1 },
                    fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' },
                  }}
                >
                  <strong style={{ opacity: 0.8 }}>Tech Stack:</strong> {tileInfo.techStack.join(', ')}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary', 
                    opacity: 0.6, 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' },
                  }}
                >
                  {index === 7 
                    ? "MuseBox layers prompt inputs, style refs, and shot metadata into a structured payload before dispatching model requests. Generated assets stream back into a scene-based storyboard, with previews and export actions optimized for fast iteration."
                    : index === 5
                    ? "Built with Web Audio API for low-latency real-time sound processing. Features MIDI support and customizable synthesizer parameters for creative music production."
                    : index === 2
                    ? "Promptly uses multimodal AI models to analyze uploaded assets and construct detailed, structurally sound prompts for creative workflows."
                    : "Advanced architecture leveraging modern frameworks and best practices for optimal performance, scalability, and user experience."}
                </Typography>
              </Box>

              {/* Padding at bottom for mobile scrolling */}
              <Box sx={{ height: { xs: 4, sm: 5, md: 6 } }} />
            </Box>
          </>
        ) : (
          /* Simple Layout without Info */
          <>
            {/* Image/Embed Column */}
            <Box
              sx={{
                width: { xs: '100%', md: '66.666%' },
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                height: { xs: '45vh', md: 'auto' },
                minHeight: { xs: '300px', md: 0 },
                borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 'none' },
                borderLeft: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.1)' },
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative', flex: 1, p: { xs: 0, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <Paper
                  elevation={8}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: { xs: 0, md: 0.5 },
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: color,
                  }}
                >
                  {previewImage && (
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                      <Box
                        component="img"
                        src={previewImage}
                        alt={`Preview ${index + 1}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 0.5 }}
                      />
                    </Box>
                  )}
                  
                  {/* Embedded web app - only for tile 6 (index 5) */}
                  {index === 5 && (
                    <iframe
                      src="https://musebox-779175721635.us-west1.run.app/"
                      title="Musebox App"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                    />
                  )}
                </Paper>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  bgcolor: '#050505',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Tile {index + 1} of {totalTiles}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {color}
                </Typography>
              </Box>
            </Box>

            {/* Simple Info Column */}
            <Box
              sx={{
                width: { xs: '100%', md: '33.333%' },
                p: { xs: 3, md: 4 },
                bgcolor: 'rgba(10, 10, 10, 0.95)',
                flexShrink: 0,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                Tile {index + 1}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.6 }}>
                Navigate using arrow keys or click outside to close.
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
}