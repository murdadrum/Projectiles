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
  TextField,
  Alert,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm } from 'react-hook-form';

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
    contactLinks?: {
      email: string;
      github: string;
      figma: string;
      linkedin: string;
      gumroad: string;
    };
  };
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function TileModal({ color, index, totalTiles, onClose, onNext, onPrev, previewImage, tileInfo }: TileModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const theme = useTheme();
  const sharedIframeProps = {
    className: "w-full h-full border-0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    sandbox: "allow-same-origin allow-scripts allow-forms allow-popups allow-modals",
    style: { border: 0, width: '100%', height: '100%' } as const,
  };

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

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    setFormSubmitted(true);
    // Add your form submission logic here
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
        'data-testid': 'tile-modal',
        sx: {
          bgcolor: theme.palette.background.default,
          backgroundImage: 'none',
          m: { xs: 0, sm: 1.5, md: 2, lg: 3 },
          borderRadius: { xs: 0, md: 1 },
          width: { xs: '100%', sm: '94vw', md: 'min(79vw, 1660px)', lg: 'min(79vw, 1660px)' },
          height: { xs: '100%', sm: 'min(90vh, 760px)', md: 'min(57vh, 780px)', lg: 'min(57vh, 780px)' },
          minWidth: { sm: '600px', md: '800px', lg: '1000px' },
          minHeight: { sm: '400px', md: '500px', lg: '600px' },
          maxWidth: { xs: '100%', sm: '94vw', md: 'min(79vw, 1660px)', lg: 'min(79vw, 1660px)' },
          maxHeight: { xs: '100%', sm: 'min(90vh, 760px)', md: 'min(57vh, 780px)', lg: 'min(57vh, 780px)' },
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
        aria-label="Close modal"
        data-testid="tile-modal-close"
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
                minWidth: 0,
                minHeight: 0,
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
              }}
            >
              {tileInfo.embedUrl || previewImage ? (
                <Box
                  sx={{
                    position: 'relative',
                    flex: 1,
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 0,
                    minHeight: 0,
                    overflow: 'hidden',
                  }}
                  className="bg-[rgba(0,0,0,0)]"
                >
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
                      minWidth: 0,
                      minHeight: 0,
                    }}
                  >
                    {index === 14 ? (
                      <iframe
                        src="https://joshbarteaux.atlassian.net/jira/software/projects/PORTO/summary"
                        title="Jira Board"
                        {...sharedIframeProps}
                      />
                    ) : tileInfo.embedUrl ? (
                      <iframe
                        src={tileInfo.embedUrl}
                        title={tileInfo.title}
                        {...sharedIframeProps}
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

              {/* Desktop Footer with Navigation Buttons */}
              <Box
                sx={{
                  bgcolor: '#050505',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>
                  Powered by React + Vite
                </Typography>
                
                {/* Navigation Buttons - Centered */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <IconButton
                    onClick={onPrev}
                    size="small"
                    aria-label="Previous tile"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={onNext}
                    size="small"
                    aria-label="Next tile"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1, textAlign: 'right' }}>
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
                minWidth: 0,
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

              {/* Contact Links - Show only for About Me tile */}
              {tileInfo.contactLinks && (
                <>
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
                      Connect With Me
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Link
                        href={`mailto:${tileInfo.contactLinks.email}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1.25rem' }} />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' } }}>
                          {tileInfo.contactLinks.email}
                        </Typography>
                      </Link>
                      <Link
                        href={tileInfo.contactLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: '1.25rem' }} />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' } }}>
                          GitHub
                        </Typography>
                      </Link>
                      <Link
                        href={tileInfo.contactLinks.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box
                          component="svg"
                          viewBox="0 0 24 24"
                          sx={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }}
                        >
                          <path d="M6 6h6v6H6zm0 6h6v6H6zm6-6h6v6h-6z" />
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' } }}>
                          Figma
                        </Typography>
                      </Link>
                      <Link
                        href={tileInfo.contactLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <LinkedInIcon sx={{ fontSize: '1.25rem' }} />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' } }}>
                          LinkedIn
                        </Typography>
                      </Link>
                      <Link
                        href={tileInfo.contactLinks.gumroad}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          opacity: 0.7,
                          transition: 'opacity 0.2s',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box
                          component="svg"
                          viewBox="0 0 24 24"
                          sx={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }}
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.8438rem', md: '0.875rem' } }}>
                          Gumroad
                        </Typography>
                      </Link>
                    </Box>
                  </Box>

                  <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                </>
              )}

              {/* Engineering Context */}
              {!tileInfo.contactLinks && (
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
                      : index === 3
                      ? "QADMS keeps QA metrics, test run histories, and investigative context centralized so engineering teams can trace regressions with clarity."
                      : "Advanced architecture leveraging modern frameworks and best practices for optimal performance, scalability, and user experience."}
                  </Typography>
                </Box>
              )}

              {/* Contact Form */}
              {tileInfo.contactLinks && (
                <Box sx={{ mt: { xs: 2.5, sm: 3, md: 3.5, lg: 4 } }}>
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
                    Contact
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      {...register('name', { required: 'Name is required' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                    <TextField
                      label="Message"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        mt: 2,
                        py: 1.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                      }}
                    >
                      Send Message
                    </Button>
                  </form>
                  {formSubmitted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Message sent successfully!
                    </Alert>
                  )}
                </Box>
              )}

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
                display: { xs: 'none', md: 'flex' },
                width: { md: '66.666%' },
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                flexDirection: 'column',
                flexShrink: 0,
                minWidth: 0,
                minHeight: 0,
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative', flex: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
                <Paper
                  elevation={8}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0.5,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: theme.palette.background.default,
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  {previewImage && (
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                      <Box
                        component="img"
                        src={previewImage}
                        alt={`Preview ${index + 1}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }}
                      />
                    </Box>
                  )}
                  
                  {/* Embedded web app - only for tile 6 (index 5) */}
                  {index === 5 && (
                    <iframe
                      src="https://musebox-779175721635.us-west1.run.app/"
                      title="Musebox App"
                      {...sharedIframeProps}
                    />
                  )}
                </Paper>
              </Box>

              {/* Footer with Navigation Buttons */}
              <Box
                sx={{
                  bgcolor: '#050505',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>
                  Tile {index + 1} of {totalTiles}
                </Typography>
                
                {/* Navigation Buttons - Centered */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <IconButton
                    onClick={onPrev}
                    size="small"
                    aria-label="Previous tile"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={onNext}
                    size="small"
                    aria-label="Next tile"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      },
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1, textAlign: 'right' }}>
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
