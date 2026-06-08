import type { CSSProperties } from 'react';

type AuraOrb = {
  inner: string;
  mid: string;
  outer: string;
};

type AuraCloudPalette = Partial<{
  rose: string;
  mint: string;
  gold: string;
  lavender: string;
}>;

interface SoftAuraCloudProps {
  className?: string;
  palette?: AuraCloudPalette;
  style?: CSSProperties;
}

const fallbackPalette = {
  rose: '224, 135, 173',
  mint: '120, 202, 186',
  gold: '219, 172, 103',
  lavender: '193, 185, 220',
};

function toRgbTriplet(color: string | undefined, fallback: string) {
  if (!color) return fallback;

  if (color.includes(',')) {
    return color;
  }

  const normalized = color.replace('#', '').trim();

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }

  const value = parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `${r}, ${g}, ${b}`;
}

export function auraCloudPaletteFromOrb(orb: AuraOrb): AuraCloudPalette {
  return {
    rose: orb.mid,
    mint: orb.outer,
    gold: orb.inner,
    lavender: orb.inner,
  };
}

export default function SoftAuraCloud({ className = '', palette, style }: SoftAuraCloudProps) {
  const cssVars = {
    '--soft-aura-rose': toRgbTriplet(palette?.rose, fallbackPalette.rose),
    '--soft-aura-mint': toRgbTriplet(palette?.mint, fallbackPalette.mint),
    '--soft-aura-gold': toRgbTriplet(palette?.gold, fallbackPalette.gold),
    '--soft-aura-lavender': toRgbTriplet(palette?.lavender, fallbackPalette.lavender),
    ...style,
  } as CSSProperties;

  return (
    <div className={`soft-aura-cloud ${className}`} style={cssVars} aria-hidden="true">
      <div className="soft-aura-cloud__field">
        <div className="soft-aura-cloud__wash soft-aura-cloud__wash-one" />
        <div className="soft-aura-cloud__wash soft-aura-cloud__wash-two" />
      </div>
      <div className="soft-aura-cloud__halo soft-aura-cloud__halo-rose" />
      <div className="soft-aura-cloud__halo soft-aura-cloud__halo-mint" />
    </div>
  );
}
