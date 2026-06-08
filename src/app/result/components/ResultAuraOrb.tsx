import type { CSSProperties } from 'react';
import type { AuraLensPalette } from './resultData';

interface ResultAuraOrbProps {
  palette: AuraLensPalette;
  className?: string;
}

function toRgbTriplet(color: string) {
  const normalized = color.replace('#', '').trim();
  const value = parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `${r}, ${g}, ${b}`;
}

export default function ResultAuraOrb({ palette, className = '' }: ResultAuraOrbProps) {
  const style = {
    '--result-lens-core': toRgbTriplet(palette.core),
    '--result-lens-soft': toRgbTriplet(palette.soft),
    '--result-lens-warm': toRgbTriplet(palette.warm),
    '--result-lens-shadow': toRgbTriplet(palette.shadow),
    '--result-lens-edge': toRgbTriplet(palette.edge),
    '--result-lens-band': toRgbTriplet(palette.band),
    '--result-lens-angle': `${palette.angle}deg`,
  } as CSSProperties;

  return (
    <div className={`result-aura-orb ${className}`} style={style} aria-hidden="true">
      <div className="result-aura-orb__ambient" />
      <div className="result-aura-orb__sphere">
        <div className="result-aura-orb__field" />
        <div className="result-aura-orb__phase" />
        <div className="result-aura-orb__depth" />
        <div className="result-aura-orb__glint" />
      </div>
    </div>
  );
}
