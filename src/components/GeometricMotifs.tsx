/**
 * Motifs géométriques : zigzag, points, cercles, arcs, plus —
 * en gris et orange (couleur principale).
 * Sur mobile : moins de motifs et tailles réduites.
 */
import { useMemo } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ACCENT = '#f97316'; /* accent-500 - orange */
const DARK = '#1e293b';   /* slate-800 */
/* Pour fonds sombres (sections noires) */
const LIGHT = '#94a3b8';   /* stone-400 */
const ACCENT_LIGHT = '#fb923c'; /* accent-400 */

type MotifType =
  | 'zigzag'
  | 'dots-line'
  | 'dots-grid'
  | 'circle-outline'
  | 'circle-filled'
  | 'circle-hatched-black'
  | 'circle-hatched-lime'
  | 'arc-black'
  | 'arc-accent'
  | 'plus-black'
  | 'plus-accent'
  | 'rect-hatched'
  | 'cube-wireframe'
  | 'diamond-outline'
  | 'diamond-filled';

interface MotifDef {
  type: MotifType;
  left: string;
  top: string;
  size: number;
  animation: string;
  delay?: number;
  duration?: number;
}

const MOTIFS: MotifDef[] = [
  { type: 'zigzag', left: '5%', top: '12%', size: 32, animation: 'motif-float', delay: 0, duration: 6 },
  { type: 'dots-line', left: '88%', top: '8%', size: 24, animation: 'motif-float', delay: 1, duration: 7 },
  { type: 'circle-outline', left: '15%', top: '35%', size: 28, animation: 'motif-float', delay: 0.5, duration: 5 },
  { type: 'circle-filled', left: '92%', top: '22%', size: 12, animation: 'motif-float', delay: 2, duration: 5 },
  { type: 'circle-hatched-black', left: '78%', top: '45%', size: 36, animation: 'motif-float', delay: 0, duration: 8 },
  { type: 'circle-hatched-lime', left: '8%', top: '68%', size: 30, animation: 'motif-float', delay: 1.5, duration: 8 },
  { type: 'arc-black', left: '72%', top: '15%', size: 26, animation: 'motif-float', delay: 0.3, duration: 6 },
  { type: 'arc-accent', left: '22%', top: '82%', size: 22, animation: 'motif-float', delay: 1, duration: 7 },
  { type: 'plus-black', left: '45%', top: '18%', size: 20, animation: 'motif-float', delay: 2, duration: 7 },
  { type: 'plus-accent', left: '55%', top: '75%', size: 18, animation: 'motif-float', delay: 0.5, duration: 9 },
  { type: 'rect-hatched', left: '35%', top: '42%', size: 28, animation: 'motif-float', delay: 1.2, duration: 6 },
  { type: 'cube-wireframe', left: '85%', top: '62%', size: 34, animation: 'motif-float', delay: 0.8, duration: 8 },
  { type: 'diamond-outline', left: '12%', top: '52%', size: 24, animation: 'motif-float', delay: 0, duration: 6 },
  { type: 'diamond-filled', left: '68%', top: '88%', size: 14, animation: 'motif-float', delay: 1.8, duration: 5 },
  { type: 'zigzag', left: '50%', top: '55%', size: 20, animation: 'motif-float', delay: 0.2, duration: 7 },
  { type: 'dots-grid', left: '28%', top: '28%', size: 40, animation: 'motif-float', delay: 1, duration: 7 },
  { type: 'arc-accent', left: '95%', top: '48%', size: 20, animation: 'motif-float', delay: 2.5, duration: 6 },
  { type: 'plus-black', left: '5%', top: '92%', size: 16, animation: 'motif-float', delay: 0, duration: 8 },
  { type: 'circle-outline', left: '62%', top: '32%', size: 18, animation: 'motif-float', delay: 1, duration: 5 },
  { type: 'diamond-outline', left: '38%', top: '88%', size: 20, animation: 'motif-float', delay: 0.6, duration: 7 },
];

function Zigzag({ size, color }: { size: number; color: string }) {
  const s = size / 32;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 32 20" fill="none" className="motif-svg">
      <path
        d="M0 10 L8 2 L16 10 L24 2 L32 10"
        stroke={color}
        strokeWidth={1.2 * s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsLine({ size, color }: { size: number; color: string }) {
  const s = size / 24;
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 24 10" fill="none" className="motif-svg">
      {[0, 6, 12, 18].map((x) => (
        <circle key={x} cx={x + 3} cy={5} r={1.2 * s} fill={color} />
      ))}
    </svg>
  );
}

function DotsGrid({ size, color }: { size: number; color: string }) {
  const s = size / 24;
  const pts = [];
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) pts.push({ x: 3 + x * 6, y: 3 + y * 6 });
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={0.8 * s} fill={color} />
      ))}
    </svg>
  );
}

function CircleOutline({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function CircleFilled({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <circle cx="12" cy="12" r="5" fill={color} />
    </svg>
  );
}

function CircleHatched({ size, color }: { size: number; color: string }) {
  const lines = [];
  for (let i = -12; i <= 12; i += 3) {
    lines.push(
      <line key={i} x1={12 + i} y1={0} x2={12 + i} y2={24} stroke={color} strokeWidth="0.8" opacity="0.9" />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1" fill="none" />
      <g opacity="0.7">{lines}</g>
    </svg>
  );
}

function Arc({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <path d="M4 20 A 10 10 0 0 1 20 4" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Plus({ size, color }: { size: number; color: string }) {
  const s = size / 20;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="motif-svg">
      <line x1="10" y1="4" x2="10" y2="16" stroke={color} strokeWidth={1.2 * s} strokeLinecap="round" />
      <line x1="4" y1="10" x2="16" y2="10" stroke={color} strokeWidth={1.2 * s} strokeLinecap="round" />
    </svg>
  );
}

function RectHatched({ size, color }: { size: number; color: string }) {
  const lines = [];
  for (let i = 0; i <= 20; i += 4) {
    lines.push(
      <line key={i} x1={i} y1={0} x2={i} y2={20} stroke={color} strokeWidth="0.8" opacity="0.85" />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className="motif-svg">
      <rect x="1" y="1" width="18" height="18" stroke={color} strokeWidth="1" fill="none" />
      <g opacity="0.7">{lines}</g>
    </svg>
  );
}

function CubeWireframe({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className="motif-svg">
      <path d="M4 20 L14 14 L14 24 L4 20 Z" stroke={color} strokeWidth="1" fill="none" />
      <path d="M14 14 L24 20 L24 10 L14 4 Z" stroke={color} strokeWidth="1" fill="none" />
      <path d="M4 20 L24 20 L24 10 L4 10 Z" stroke={color} strokeWidth="1" fill="none" />
      <path d="M14 4 L4 10 L14 14 Z" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

function DiamondOutline({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function DiamondFilled({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="motif-svg">
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={color} />
    </svg>
  );
}

interface MotifColors {
  dark: string;
  accent: string;
}

function MotifShape({ def, colors }: { def: MotifDef; colors: MotifColors }) {
  const duration = def.duration ?? 6;
  const delay = def.delay ?? 0;
  const style = useMemo(
    () => ({
      left: def.left,
      top: def.top,
      width: def.size,
      height: def.size,
      animation: `motif-float ${duration}s ease-in-out ${delay}s infinite`,
      willChange: 'transform' as const,
    }),
    [def, duration, delay]
  );

  const common = { size: def.size };
  let content: React.ReactNode = null;

  switch (def.type) {
    case 'zigzag':
      content = <Zigzag {...common} color={colors.dark} />;
      break;
    case 'dots-line':
      content = <DotsLine {...common} color={colors.dark} />;
      break;
    case 'dots-grid':
      content = <DotsGrid {...common} color={colors.dark} />;
      break;
    case 'circle-outline':
      content = <CircleOutline {...common} color={colors.dark} />;
      break;
    case 'circle-filled':
      content = <CircleFilled {...common} color={colors.dark} />;
      break;
    case 'circle-hatched-black':
      content = <CircleHatched {...common} color={colors.dark} />;
      break;
    case 'circle-hatched-lime':
      content = <CircleHatched {...common} color={colors.accent} />;
      break;
    case 'arc-black':
      content = <Arc {...common} color={colors.dark} />;
      break;
    case 'arc-accent':
      content = <Arc {...common} color={colors.accent} />;
      break;
    case 'plus-black':
      content = <Plus {...common} color={colors.dark} />;
      break;
    case 'plus-accent':
      content = <Plus {...common} color={colors.accent} />;
      break;
    case 'rect-hatched':
      content = <RectHatched {...common} color={colors.dark} />;
      break;
    case 'cube-wireframe':
      content = <CubeWireframe {...common} color={colors.accent} />;
      break;
    case 'diamond-outline':
      content = <DiamondOutline {...common} color={colors.dark} />;
      break;
    case 'diamond-filled':
      content = <DiamondFilled {...common} color={colors.dark} />;
      break;
    default:
      return null;
  }

  return (
    <div
      className="motif-item"
      style={style}
      aria-hidden
    >
      {content}
    </div>
  );
}

interface GeometricMotifsProps {
  /** 'fixed' = couche globale (viewport), 'absolute' = à l'intérieur de la section parente */
  mode?: 'fixed' | 'absolute';
  /** 'light' pour sections à fond sombre (Parcours Pro, Footer) */
  variant?: 'default' | 'light';
}

const COLORS_DEFAULT: MotifColors = { dark: DARK, accent: ACCENT };
const COLORS_LIGHT: MotifColors = { dark: LIGHT, accent: ACCENT_LIGHT };

const MOTIFS_MOBILE_COUNT = 6;
const MOTIFS_MOBILE_SIZE_SCALE = 0.65;

export default function GeometricMotifs({ mode = 'fixed', variant = 'default' }: GeometricMotifsProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const colors = variant === 'light' ? COLORS_LIGHT : COLORS_DEFAULT;
  const containerClass =
    mode === 'absolute'
      ? 'absolute inset-0 overflow-hidden pointer-events-none z-[1]'
      : 'fixed inset-0 overflow-hidden pointer-events-none z-0';

  const displayMotifs = useMemo(() => {
    if (!isMobile) return MOTIFS;
    return MOTIFS.slice(0, MOTIFS_MOBILE_COUNT).map((def) => ({
      ...def,
      size: Math.max(12, Math.round(def.size * MOTIFS_MOBILE_SIZE_SCALE)),
    }));
  }, [isMobile]);

  return (
    <div className={containerClass} aria-hidden>
      {displayMotifs.map((def, i) => (
        <MotifShape key={`${def.type}-${def.left}-${def.top}-${i}`} def={def} colors={colors} />
      ))}
    </div>
  );
}
