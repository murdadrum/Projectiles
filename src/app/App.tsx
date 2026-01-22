import { Tile } from "./components/Tile";
import { TileModal } from "./components/TileModal";
import { useState, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, Box } from '@mui/material';
import tile16Image from 'figma:asset/d1189839d71010eac49be0b77e373fba3d5949f3.png';

// Material Design dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5FF', // Cyan accent
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Aldrich", "Roboto Mono", "Courier New", "Courier", monospace',
      fontWeight: 400,
      letterSpacing: '0.25em',
    },
    caption: {
      fontFamily: '"Abel", "Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: '0.075em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8, // Material Design 8dp grid
});

// Mosaic color palette - 16 colors for 4x4 grid
const tileColors = [
  '#fababa', // soft pink
  '#f8b4d9', // rose pink
  '#d4a5f8', // lavender
  '#a8c7fa', // light blue
  '#ffd4a3', // peach
  '#ffb3ba', // coral
  '#bae1ff', // sky blue
  '#c7f0bd', // mint green
  '#ffe5b4', // cream
  '#ffc8dd', // pink
  '#b8e0d2', // seafoam
  '#f7cac9', // dusty rose
  '#92a8d1', // periwinkle
  '#ffaaa5', // salmon
  '#c9a0dc', // purple
  '#a7c4bc', // sage green
];

// Preview images - optional preview images for tiles
const previewImages: { [key: number]: string } = {
  15: tile16Image, // About Me tile
};

// Tile information for special layouts
const tileInfo: { [key: number]: { 
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
  }
} } = {
  0: { // Tile 1
    title: "VennDiachrome",
    subtitle: "WEB APP",
    description: "Real-time analytics dashboard with dynamic charting and interactive data exploration.",
    details: [
      "Processes streaming data with WebSocket connections for live updates.",
      "Features customizable widgets with drag-and-drop layout configuration.",
    ],
    techStack: ["React", "D3.js", "WebSockets"],
    embedUrl: "https://venndiachrome.figma.site/"
  },
  1: { // Tile 2
    title: "NeuralCanvas",
    subtitle: "AI Art Studio",
    description: "Generative art platform powered by machine learning for creative exploration.",
    details: [
      "Integrates multiple AI models for style transfer and image generation.",
      "Supports batch processing with preset templates and custom parameters.",
    ],
    techStack: ["Python", "TensorFlow", "React"]
  },
  2: { // Tile 3
    title: "Promptly",
    subtitle: "Web Application",
    description: "A streamlined interface for drafting and storyboarding prompts.",
    details: [
      "Allows users to add reference media to generate structured cinematic prompts.",
      "Supports dragging and dropping video or image assets.",
    ],
    techStack: ["Next.js", "GPT-4", "Vector DB"],
    embedUrl: "https://promptly-779175721635.us-west1.run.app"
  },
  3: { // Tile 4
    title: "CodeReview AI",
    subtitle: "Developer Tools",
    description: "Automated code review assistant with AI-powered suggestions.",
    details: [
      "Analyzes pull requests for potential bugs, security issues, and style violations.",
      "Learns from team patterns to provide contextual recommendations.",
    ],
    techStack: ["TypeScript", "OpenAI", "GitHub API"]
  },
  4: { // Tile 5
    title: "HealthTrack",
    subtitle: "Mobile Health",
    description: "Personal wellness companion with habit tracking and health insights.",
    details: [
      "Syncs with wearable devices for comprehensive health metrics.",
      "Provides personalized recommendations based on behavioral patterns.",
    ],
    techStack: ["React Native", "Firebase", "HealthKit"]
  },
  5: { // Tile 6
    title: "MuseBox Audio",
    subtitle: "Web Application",
    description: "Interactive music sequencer and audio synthesis playground.",
    details: [
      "Built with Web Audio API for low-latency real-time sound processing.",
      "Features MIDI support and customizable synthesizer parameters.",
    ],
    techStack: ["Web Audio API", "React", "Tone.js"],
    embedUrl: "https://musebox-779175721635.us-west1.run.app/"
  },
  6: { // Tile 7
    title: "TaskFlow",
    subtitle: "Project Management",
    description: "Collaborative task management with visual workflow automation.",
    details: [
      "Integrates with Slack, Jira, and GitHub for unified project tracking.",
      "Automates repetitive workflows with custom trigger-action rules.",
    ],
    techStack: ["Vue.js", "GraphQL", "PostgreSQL"]
  },
  7: { // Tile 8
    title: "MuseBox",
    subtitle: "Web Application",
    description: "A cinematic prompt studio for generating image sequences and storyboard-ready frames.",
    details: [
      "Combines prompt + style references with global attributes like lens, lighting, and aspect.",
      "Organizes outputs into scene boards with quick export options for production handoff.",
    ],
    techStack: ["React", "Vite", "Gemini API"],
    embedUrl: "https://musebox-779175721635.us-west1.run.app/"
  },
  8: { // Tile 9
    title: "VoiceScript",
    subtitle: "Accessibility Tools",
    description: "Speech-to-text transcription service with multi-language support.",
    details: [
      "Leverages transformer models for accurate speaker diarization.",
      "Exports formatted transcripts with timestamps and speaker labels.",
    ],
    techStack: ["Python", "Whisper AI", "FastAPI"]
  },
  9: { // Tile 10
    title: "MarketPulse",
    subtitle: "Finance Analytics",
    description: "Stock market analysis platform with predictive modeling and alerts.",
    details: [
      "Aggregates data from multiple financial APIs for comprehensive market coverage.",
      "Uses machine learning for trend detection and anomaly alerts.",
    ],
    techStack: ["React", "Python", "TensorFlow"]
  },
  10: { // Tile 11
    title: "EcoTracker",
    subtitle: "Sustainability",
    description: "Carbon footprint calculator with personalized reduction strategies.",
    details: [
      "Tracks energy usage, transportation, and consumption patterns.",
      "Provides actionable insights to reduce environmental impact.",
    ],
    techStack: ["React", "Node.js", "MongoDB"]
  },
  11: { // Tile 12
    title: "DesignKit",
    subtitle: "Creative Tools",
    description: "Component library and design system management platform.",
    details: [
      "Auto-generates documentation from code with live component previews.",
      "Version control for design tokens with multi-platform export.",
    ],
    techStack: ["React", "Storybook", "Figma API"]
  },
  12: { // Tile 13
    title: "SecureVault",
    subtitle: "Security",
    description: "Password manager with biometric authentication and secure sharing.",
    details: [
      "Zero-knowledge architecture ensures only users can decrypt their data.",
      "Supports team vaults with granular access control and audit logs.",
    ],
    techStack: ["Electron", "Rust", "SQLCipher"]
  },
  13: { // Tile 14
    title: "LearnHub",
    subtitle: "Education Platform",
    description: "Adaptive learning platform with personalized course recommendations.",
    details: [
      "Uses spaced repetition algorithms to optimize knowledge retention.",
      "Tracks learning progress with detailed analytics and achievement badges.",
    ],
    techStack: ["Next.js", "PostgreSQL", "Redis"]
  },
  14: { // Tile 15
    title: "PixelForge",
    subtitle: "Image Processing",
    description: "Batch image optimization and transformation toolkit for developers.",
    details: [
      "Supports format conversion, resizing, and compression with quality presets.",
      "CLI and web interface for flexible workflow integration.",
    ],
    techStack: ["Node.js", "Sharp", "React"]
  },
  15: { // Tile 16 - About Me
    title: "About Me",
    subtitle: "UX Engineer & Creative Technologist",
    description: "I'm a multidisciplinary designer and developer passionate about creating delightful user experiences through the intersection of design and technology.",
    details: [
      "10+ years of experience in UX design, front-end development, and creative coding.",
      "Specialized in building interactive web applications with React, TypeScript, and modern design systems.",
      "Led design and engineering initiatives for products used by millions of users.",
      "Passionate about bridging the gap between design and engineering teams.",
    ],
    techStack: ["React", "TypeScript", "Figma", "Node.js", "Three.js"],
    contactLinks: {
      email: "josh@remotelyamused.com",
      github: "https://github.com/murdadrum",
      figma: "https://www.figma.com/@JoshUX",
      linkedin: "https://www.linkedin.com/in/joshbarteaux",
      gumroad: "https://remotelyamused.gumroad.com"
    }
  }
};

function AppContent() {
  const [selectedTile, setSelectedTile] = useState<{ color: string; index: number } | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [prevMousePosition, setPrevMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredTileIndex, setHoveredTileIndex] = useState<number | null>(null);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [touchFlippedTiles, setTouchFlippedTiles] = useState<Set<number>>(new Set());
  const [randomlyFlippedTiles, setRandomlyFlippedTiles] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const flipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const handleNext = () => {
    if (selectedTile) {
      const nextIndex = (selectedTile.index + 1) % tileColors.length;
      setSelectedTile({ color: tileColors[nextIndex], index: nextIndex });
    }
  };

  const handlePrev = () => {
    if (selectedTile) {
      const prevIndex = (selectedTile.index - 1 + tileColors.length) % tileColors.length;
      setSelectedTile({ color: tileColors[prevIndex], index: prevIndex });
    }
  };

  const handleTileClick = (color: string, index: number) => {
    if (isTouchDevice) {
      // Clear any existing timer
      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current);
        flipTimerRef.current = null;
      }

      // On touch devices: first click flips, second click opens modal
      if (touchFlippedTiles.has(index)) {
        // Already flipped, so open modal
        setSelectedTile({ color, index });
        // Reset flipped state when modal opens
        setTouchFlippedTiles(new Set());
      } else {
        // Not flipped yet, so flip it (and unflip any other tiles)
        setTouchFlippedTiles(new Set([index]));
        
        // Start 1200ms timer (50% longer than 800ms) to auto-flip back and then flip a random different tile
        flipTimerRef.current = setTimeout(() => {
          // Flip back to original
          setTouchFlippedTiles(new Set());
          
          // After a brief delay, flip a random different tile to command attention
          setTimeout(() => {
            // Get available tiles (not yet randomly flipped and not the current tile)
            const availableTiles = Array.from({ length: tileColors.length }, (_, i) => i)
              .filter(i => i !== index && !randomlyFlippedTiles.has(i));
            
            // If all tiles have been randomly flipped, reset the tracking
            let randomIndex;
            if (availableTiles.length === 0) {
              // Reset and exclude only the current tile
              setRandomlyFlippedTiles(new Set([index]));
              const resetAvailable = Array.from({ length: tileColors.length }, (_, i) => i)
                .filter(i => i !== index);
              randomIndex = resetAvailable[Math.floor(Math.random() * resetAvailable.length)];
            } else {
              // Select from available tiles
              randomIndex = availableTiles[Math.floor(Math.random() * availableTiles.length)];
            }
            
            // Mark this tile as randomly flipped
            setRandomlyFlippedTiles(prev => new Set([...prev, randomIndex]));
            
            // Flip the random tile
            setTouchFlippedTiles(new Set([randomIndex]));
            
            // Set another timer for the new flipped tile (1200ms)
            flipTimerRef.current = setTimeout(() => {
              setTouchFlippedTiles(new Set());
              flipTimerRef.current = null;
            }, 1200);
          }, 300); // 300ms delay between flip back and new flip for visual clarity
          
        }, 1200);
      }
    } else {
      // On desktop: click always opens modal
      setSelectedTile({ color, index });
    }
  };

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    setPrevMousePosition(mousePosition);
    setMousePosition(newPosition);
  };

  const handleGridMouseLeave = () => {
    setMousePosition(null);
    setHoveredTileIndex(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { 
            xs: 'min(85vh, 95vw)',
            sm: 'min(75vh, 85vw)', 
            md: 'min(72vh, 72vw)' 
          },
          display: 'flex',
          flexDirection: 'column',
          pt: '48px',
        }}
      >
        {/* Header - Aligned to left of grid */}
        <Box 
          sx={{ 
            mb: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            px: 1.5,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { 
                xs: '1.75rem',  // 28px
                sm: '2.25rem',  // 36px
                md: '3rem',     // 48px
                lg: '3rem'      // 48px
              },
              lineHeight: { xs: '1.5rem', sm: '1.75rem', md: '2.375rem', lg: '2.375rem' }, // 38px at desktop
              letterSpacing: { xs: '2px', sm: '3px', md: '4px' },
              textTransform: 'uppercase',
              color: 'text.primary',
              textAlign: 'left',
            }}
          >
            PROJECTILES
          </Typography>
        </Box>

        {/* 4x4 Material Design Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: { xs: 0.75, sm: 1, md: 1.5 },
            width: '100%',
            aspectRatio: '1',
            p: 1.5,
            mt: -1.5,
          }}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridMouseLeave}
          ref={gridRef} className="mx-[0px] my-[-12px]"
        >
          {tileColors.map((color, index) => {
            // Calculate cascade delay based on position (top-left to bottom-right)
            const row = Math.floor(index / 4);
            const col = index % 4;
            const cascadeDelay = (row + col) * 100; // 100ms between each diagonal wave
              
            return (
              <Tile
                key={index}
                color={color}
                index={index}
                onClick={() => handleTileClick(color, index)}
                previewImage={previewImages[index]}
                mousePosition={isTouchDevice ? null : mousePosition}
                isActiveHover={isTouchDevice ? false : hoveredTileIndex === index}
                onTileHoverChange={(isHovering) => !isTouchDevice && setHoveredTileIndex(isHovering ? index : null)}
                prevMousePosition={prevMousePosition}
                initialFlipped={!initialAnimationComplete}
                cascadeDelay={cascadeDelay}
                onInitialFlipComplete={() => {
                  // When the last tile finishes, mark animation as complete
                  if (index === tileColors.length - 1) {
                    setInitialAnimationComplete(true);
                  }
                }}
                isTouchFlipped={touchFlippedTiles.has(index)}
                isTouchDevice={isTouchDevice}
              />
            );
          })}
        </Box>

        {/* Footer - Two columns: email on left, JOSH/UX on right */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            mt: { xs: 2, sm: 2.5, md: 3 },
            px: 1.5,
            width: '100%',
          }} className="mt-[12px] mr-[0px] mb-[0px] ml-[0px]"
        >

          {/* Left: @joshbarteaux */}
          <Typography
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { 
                xs: '1.5rem',    // 24px
                sm: '1.5rem',    // 24px
                md: '1.5rem',    // 24px
                lg: '1.5rem'     // 24px
              },
              lineHeight: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '1.75rem' }, // 24px at desktop
              letterSpacing: { xs: '2px', sm: '3px', md: '4px' },
              textTransform: 'uppercase',
              color: 'text.primary',
              textAlign: 'right',
            }}
          >
            <a href="mailto:josh@remotelyamused.com">@joshbarteaux</a>
          </Typography>
        </Box>
      </Box>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedTile && (
          <TileModal
            color={selectedTile.color}
            index={selectedTile.index}
            totalTiles={tileColors.length}
            onClose={() => setSelectedTile(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            previewImage={previewImages[selectedTile.index]}
            tileInfo={tileInfo[selectedTile.index]}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

// Wrapper component to intercept and block all props from being passed to Material UI
function ThemeWrapper() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

// Export default App component that blocks all Figma props
export default function App(props: any) {
  // Render a wrapper div that accepts all Figma data attributes,
  // preventing them from being passed to Material UI components
  return (
    <div {...props}>
      <ThemeWrapper />
    </div>
  );
}