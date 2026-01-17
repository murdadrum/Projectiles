import { Tile } from "./components/Tile";
import { TileModal } from "./components/TileModal";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, Box } from '@mui/material';

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
const previewImages: { [key: number]: string } = {};

// Tile information for special layouts
const tileInfo: { [key: number]: { 
  title: string; 
  subtitle?: string;
  description: string; 
  details: string[];
  techStack: string[];
  embedUrl?: string;
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
    title: "MuseBox Studio",
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
  15: { // Tile 16
    title: "ChatBridge",
    subtitle: "Communication",
    description: "Multi-platform messaging aggregator with unified inbox.",
    details: [
      "Consolidates messages from Slack, Teams, Discord, and email.",
      "Smart filtering and priority inbox for focused communication.",
    ],
    techStack: ["Electron", "WebSocket", "Redis"]
  }
};

export default function App() {
  const [selectedTile, setSelectedTile] = useState<{ color: string; index: number } | null>(null);

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

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }} className="px-[32px] pt-[60px] pb-[24px] py-[48px] pr-[16px] pl-[16px]"
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
            {/* Header - Aligned to right of grid */}
            <Box 
              sx={{ 
                mb: 3,
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }} className="px-[12px] py-[0px]"
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
                    lg: '3.625rem'  // 58px
                  },
                  lineHeight: { xs: '1.5rem', sm: '1.75rem', md: '1.75rem', lg: '1.75rem' }, // 28px
                  letterSpacing: { xs: '2px', sm: '3px', md: '4px' },
                  textTransform: 'uppercase',
                  color: 'text.primary',
                  textAlign: 'center',
                }} className="text-right"
              >
                ProjecTiles
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
              }} className="p-[12px] mt-[-12px] mr-[0px] mb-[0px] ml-[0px]"
            >
              {tileColors.map((color, index) => (
                <Tile
                  key={index}
                  color={color}
                  index={index}
                  onClick={() => setSelectedTile({ color, index })}
                  previewImage={previewImages[index]}
                />
              ))}
            </Box>

            {/* Footer - Aligned to left of grid */}
            <Typography
              variant="caption"
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mt: { xs: 2, sm: 2.5, md: 3 },
                fontFamily: '"Abel", sans-serif',
                fontWeight: 400,
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }, // 16px at desktop
                lineHeight: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, // 20px at desktop
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: { xs: '0.8px', sm: '1px', md: '1.2px' },
                textTransform: 'uppercase',
                textAlign: 'left',
                '& a': {
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                },
              }} className="mt-[12px] mr-[0px] mb-[0px] ml-[0px] px-[12px] py-[0px]"
            >
              <a href="mailto:josh@hooloovoocafe.com">JOSH@REMOTELYAMUSED.COM</a>
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
      </ThemeProvider>
    </div>
  );
}