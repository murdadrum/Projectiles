import { Tile } from "./components/Tile";
import { TileModal } from "./components/TileModal";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, Box } from '@mui/material';

const maintenanceMode = String(import.meta.env.VITE_MAINTENANCE_MODE).toLowerCase() === 'true';

function MaintenanceScreen() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        background:
          'radial-gradient(circle at 20% 20%, rgba(0,229,255,0.12), transparent 50%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.08), transparent 40%), #0A0A0A',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 760,
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '16px',
          p: { xs: 3, md: 6 },
          background: 'rgba(8, 8, 8, 0.82)',
          backdropFilter: 'blur(8px)',
          textAlign: 'left',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Aldrich", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: { xs: '12px', md: '14px' },
            color: '#00E5FF',
            mb: 2,
          }}
        >
          Planned Maintenance
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Aldrich", sans-serif',
            fontSize: { xs: '28px', md: '44px' },
            lineHeight: 1.1,
            letterSpacing: '1.5px',
            color: '#FFFFFF',
            mb: 2,
          }}
        >
          ProjecTiles is temporarily unavailable
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.72)',
            fontSize: { xs: '15px', md: '18px' },
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          We are performing an infrastructure update and will be back shortly.
          Thank you for your patience.
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.55)',
            fontFamily: '"Abel", sans-serif',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            fontSize: { xs: '11px', md: '13px' },
          }}
        >
          Contact: josh@remotelyamused.com
        </Typography>
      </Box>
    </Box>
  );
}

// Import tile images from Figma
import imgTile0 from "../assets/Tile Images/Tile1.png";
import imgTile1 from "../assets/Tile Images/Frame 2 Docker.png";
import imgTile2 from "../assets/Tile Images/Tile3promptly.png";
import imgTile3 from "../assets/Tile Images/Tile4lvble.png";
import imgTile4 from "../assets/Tile Images/Tile5.png";
import imgTile5 from "../assets/b6eee35dfcd6556c9a1cad0bba22b81a61d0e23e.png";
import imgTile6 from "../assets/Tile Images/Tile7.png";
import imgTile7 from "../assets/535e811a44d7022bdae1e1b98488a8b98ac39536.png";
import imgTile8 from "../assets/8d4c02cbc8a1f53547722fccbf6a7970a825b593.png";
import imgTile9 from "../assets/f22999f701e867f15d4aeabf9f4c29760a105ea8.png";
import imgTile10 from "../assets/Tile Images/Tile11 LetterMark-1.png";
import imgTile11 from "../assets/6cf4f2b642a8f57792a2f325a4cef91211e940b4.png";
import imgTile12 from "../assets/5263fe41ea24dd1c6b07fe35ce3749cf6dff3799.png";
import imgTile13 from "../assets/70c9051db60a985c721347568f023a4add0e07d2.png";
import imgTile14 from "../assets/Tile Images/Tile15.png";
import imgTile15 from "../assets/Tile Images/Tile16.png";

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
  0: imgTile0,
  1: imgTile1,
  2: imgTile2,
  3: imgTile3,
  4: imgTile4,
  5: imgTile5,
  6: imgTile6,
  7: imgTile7,
  8: imgTile8,
  9: imgTile9,
  10: imgTile10,
  11: imgTile11,
  12: imgTile12,
  13: imgTile13,
  14: imgTile14,
  15: imgTile15,
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
    title: "GeoLogic",
    subtitle: "Geospatial Operations Platform",
    description: "Intelligence workspace that blends satellite, sensor, and on-the-ground telemetry for terrain-aware decision making.",
    details: [
      "Surfaces layered map insights with historical context, live sensor feeds, and forecast overlays.",
      "Empowers teams to build collaborative scenarios, assign regional actions, and push guided alerts.",
    ],
    techStack: ["React", "Mapbox GL JS", "PostGIS", "Node.js"]
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
    title: "QADMS",
    subtitle: "Quality Assurance Platform",
    description: "Lovable's QA Data Management System aggregates tests, metrics, and diagnostics into a single, shareable workspace.",
    details: [
      "Surfaces cross-project test runs, auto-linking failures to builds and investigations.",
      "Highlights triaged bugs and stabilizes QA handoffs with contextual notes and status tracking.",
    ],
    techStack: ["TypeScript", "React", "PostgreSQL"],
    embedUrl: "https://qadms.lovable.app/"
  },
  4: { // Tile 5
    title: "Sidenote",
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
    title: "QuarterMaster",
    subtitle: "Performance Dashboard",
    description: "Live status board for Lighthouse baseline metrics and QA performance reporting.",
    details: [
      "Tracks Core Web Vitals and performance score targets per release.",
      "Designed as a lightweight snapshot for audit-ready reporting.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Lighthouse"],
    embedUrl: "/QuarterMaster-PerformanceDashboard.html"
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
    techStack: ["Next.js", "PostgreSQL", "Redis"],
    embedUrl: "/Test-Run-Dashboard.html"
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
      gumroad: "https://www.salesforce.com/trailblazer/g67ae2eb0oyxu7m3l3"
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
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'center',
        px: { xs: '16px', sm: '32px', md: '96px' },
        py: { xs: '60px', sm: '48px', md: '48px' },
      }} className="bg-[rgb(0,0,0)]"
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '696px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Header - Centered */}
        <Box 
          sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            px: '12px',
            mb: 0,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: '\"Aldrich\", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '32px', sm: '40px', md: '48px' },
              lineHeight: { xs: '32px', sm: '36px', md: '38px' },
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'text.primary',
            }} className="text-[48px]"
          >
            josh/barteaux
          </Typography>
        </Box>

        {/* 4x4 Material Design Grid */}
        <Box
          sx={{
            width: '100%',
            p: '12px',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              width: '100%',
            }}
            data-testid="tile-grid"
            onMouseMove={handleGridMouseMove}
            onMouseLeave={handleGridMouseLeave}
            ref={gridRef}
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
        </Box>

        {/* Footer - Contact Links */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: { xs: '8px', sm: '16px', md: '24px' },
            px: '12px',
            py: '16px',
            overflow: 'auto',
          }}
        >
          {/*
          <Typography
            component="a"
            href="mailto:josh@remotelyamused.com"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '12px', sm: '14px', md: '16px' },
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            email
          </Typography>
          */}
          <Typography
            component="a"
            href="https://github.com/murdadrum"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '12px', sm: '14px', md: '16px' },
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            GitHub
          </Typography>
          <Typography
            component="a"
            href="https://www.figma.com/@JoshUX"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '12px', sm: '14px', md: '16px' },
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            Figma
          </Typography>
          <Typography
            component="a"
            href="https://www.linkedin.com/in/joshbarteaux"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '12px', sm: '14px', md: '16px' },
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            LinkedIn
          </Typography>
          <Typography
            component="a"
            href="https://www.salesforce.com/trailblazer/g67ae2eb0oyxu7m3l3"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: '"Aldrich", sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '12px', sm: '14px', md: '16px' },
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            Salesforce
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

// Export default App component that blocks all Figma props
export default function App(props: any) {
  // Accept props but don't pass them anywhere - creates complete isolation
  const _ = props; // Consume props to satisfy linter
  
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {maintenanceMode ? <MaintenanceScreen /> : <AppContent />}
      </ThemeProvider>
    </div>
  );
}
