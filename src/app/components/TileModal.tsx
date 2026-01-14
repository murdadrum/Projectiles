import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
}

export function TileModal({ color, index, totalTiles, onClose, onNext, onPrev, previewImage, tileInfo }: TileModalProps) {
  const [isVisible, setIsVisible] = useState(false);

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
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8
        transition-all duration-300 ease-out
        ${isVisible ? 'bg-black/80 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none pointer-events-none'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          bg-[#0A0A0A] border-x md:border border-white/10 w-full max-w-6xl h-full md:h-[90vh] md:max-h-[90vh]
          overflow-y-auto md:rounded-lg shadow-2xl flex flex-col md:flex-row-reverse
          transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-[60] text-white/50 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-md border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {tileInfo ? (
          /* Project Layout with Info */
          <>
            {/* DESKTOP ONLY: COMPONENT / IMAGE COLUMN (Right side) */}
            <div className="hidden md:flex w-full md:w-2/3 bg-black/20 flex-col flex-shrink-0 border-l border-white/10 relative">
              {tileInfo.embedUrl || previewImage ? (
                <div className="relative flex-1 p-8 flex items-center justify-center overflow-hidden">
                  {/* Inner Container */}
                  <div className="w-full h-full shadow-2xl rounded-sm overflow-hidden border border-white/5 bg-[#0A0A0A] relative">
                    {tileInfo.embedUrl ? (
                      <iframe
                        src={tileInfo.embedUrl}
                        className="w-full h-full border-0"
                        title={tileInfo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                      />
                    ) : previewImage ? (
                      <img
                        src={previewImage}
                        alt={tileInfo.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Desktop Footer */}
              <div className="bg-[#050505] border-t border-white/5 p-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest z-10 shrink-0">
                <span>Powered by React + Vite</span>
                <span>{tileInfo.techStack.join(' • ')}</span>
              </div>
            </div>

            {/* TEXT COLUMN (Full width on mobile, 1/3 on desktop) */}
            <div className="w-full md:w-1/3 p-6 md:p-8 space-y-6 md:space-y-8 bg-[#0A0A0A]/95 flex-shrink-0">
              <div>
                {tileInfo.subtitle && (
                  <div className="font-mono text-xs text-[#00E5FF] uppercase tracking-widest mb-2">{tileInfo.subtitle}</div>
                )}
                <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-white">{tileInfo.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tileInfo.techStack.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 border border-white/10 rounded-full text-white/60 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile: Link to open app */}
              {tileInfo.embedUrl && (
                <a
                  href={tileInfo.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:hidden w-full flex items-center justify-center gap-2 bg-[#00E5FF] text-black px-6 py-4 rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-[#00D4EE] transition-colors"
                >
                  Launch App
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {/* About the Project */}
              {(tileInfo.description || tileInfo.details) && (
                <div className="space-y-4">
                  <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest">About the Project</h3>
                  {tileInfo.description && (
                    <p className="text-sm text-white/70 leading-relaxed pl-4 border-l border-white/10">
                      {tileInfo.description}
                    </p>
                  )}
                  {tileInfo.details && tileInfo.details.length > 0 && (
                    <ul className="space-y-3">
                      {tileInfo.details.map((bullet, i) => (
                        <li key={i} className="text-sm text-white/60 leading-relaxed pl-4 border-l border-white/10">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Engineering Context */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest">Engineering</h3>
                <div className="text-sm text-white/60 leading-relaxed font-light">
                  <p className="mb-2">
                    <strong className="text-white/80">Tech Stack:</strong> {tileInfo.techStack.join(', ')}
                  </p>
                  <p className="text-white/60">
                    {index === 7 
                      ? "MuseBox layers prompt inputs, style refs, and shot metadata into a structured payload before dispatching model requests. Generated assets stream back into a scene-based storyboard, with previews and export actions optimized for fast iteration."
                      : index === 5
                      ? "Built with Web Audio API for low-latency real-time sound processing. Features MIDI support and customizable synthesizer parameters for creative music production."
                      : index === 2
                      ? "Promptly uses multimodal AI models to analyze uploaded assets and construct detailed, structurally sound prompts for creative workflows."
                      : "Advanced architecture leveraging modern frameworks and best practices for optimal performance, scalability, and user experience."}
                  </p>
                </div>
              </div>

              {/* Padding at bottom for mobile scrolling */}
              <div className="h-12 md:hidden"></div>
            </div>
          </>
        ) : (
          /* Simple Layout without Info */
          <>
            {/* Image/Embed Column */}
            <div className="w-full md:w-2/3 bg-black/20 flex flex-col flex-shrink-0 h-[45vh] md:h-auto min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-l border-white/10 relative">
              <div className="relative flex-1 p-0 md:p-8 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full md:shadow-2xl md:rounded-sm overflow-hidden md:border border-white/5 relative" style={{ backgroundColor: color }}>
                  {previewImage && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <img 
                        src={previewImage} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                  )}
                  
                  {/* Embedded web app - only for tile 6 (index 5) */}
                  {index === 5 && (
                    <iframe
                      src="https://musebox-779175721635.us-west1.run.app/"
                      className="absolute inset-0 w-full h-full border-0"
                      title="Musebox App"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                    />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#050505] border-t border-white/5 p-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest z-10 shrink-0">
                <span>Tile {index + 1} of {totalTiles}</span>
                <span>{color}</span>
              </div>
            </div>

            {/* Simple Info Column */}
            <div className="w-full md:w-1/3 p-6 md:p-8 space-y-8 bg-[#0A0A0A]/95 flex-shrink-0">
              <div>
                <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-white">Tile {index + 1}</h2>
                <p className="text-sm text-white/60">Navigate using arrow keys or click outside to close.</p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}