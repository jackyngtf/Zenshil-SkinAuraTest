import { auraKeywordsDisplay, auraNumbers, auraOrbColors } from './resultData';

export interface ShareAuraProfile {
  id: string;
  name: string;
  chineseName: string;
  quote: string;
  quoteEn?: string;
}

export type ShareLanguage = 'en' | 'zh';

interface ShareImageOptions {
  aura: ShareAuraProfile;
  matchPercentage: number;
  language: ShareLanguage;
}

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1920;
const OFFICIAL_LOGO_PATH = '/assets/brand/zenshil-logo-official-share.png';

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  const value = parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawFittedSingleLineText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxFontSize: number,
  minFontSize: number,
  fontFamily: string
) {
  let fontSize = maxFontSize;

  while (fontSize > minFontSize) {
    ctx.font = `400 ${fontSize}px ${fontFamily}`;

    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }

    fontSize -= 1;
  }

  ctx.font = `400 ${fontSize}px ${fontFamily}`;
  const measuredWidth = ctx.measureText(text).width;

  if (measuredWidth <= maxWidth) {
    ctx.fillText(text, x, y);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(maxWidth / measuredWidth, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawZenshilMark(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#292524';

  ctx.beginPath();
  ctx.ellipse(0, -34, 16, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 14, -0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 28, 58, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
    image.src = src;
  });
}

function drawOfficialLogo(ctx: CanvasRenderingContext2D, logo: HTMLImageElement | null) {
  if (!logo) {
    drawZenshilMark(ctx, 540, 166, 0.56);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#292524';
    ctx.font = '500 42px Georgia, serif';
    ctx.fillText('ZENSHIL', 540, 262);
    return;
  }

  const targetWidth = 255;
  const targetHeight = targetWidth * (logo.naturalHeight / logo.naturalWidth);

  ctx.drawImage(
    logo,
    (CARD_WIDTH - targetWidth) / 2,
    98,
    targetWidth,
    targetHeight
  );
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPill(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, paddingX = 34) {
  ctx.font = '500 28px Arial, sans-serif';
  const textWidth = ctx.measureText(text).width;
  const width = textWidth + paddingX * 2;
  const height = 62;

  ctx.save();
  ctx.shadowColor = 'rgba(120, 96, 72, 0.13)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.86)';
  ctx.lineWidth = 2;
  roundedRectPath(ctx, x - width / 2, y - height / 2, width, height, height / 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#78716c';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y + 1);
  ctx.restore();
}

function drawAuraBlob(
  ctx: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  radius: number,
  alpha: number
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, rgba(color, alpha));
  gradient.addColorStop(0.52, rgba(color, alpha * 0.62));
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(-radius * 1.8, -radius * 1.8, radius * 3.6, radius * 3.6);
}

function drawShareAuraCloud(
  ctx: CanvasRenderingContext2D,
  orb: { inner: string; mid: string; outer: string },
  x: number,
  y: number,
  radius: number
) {
  const canvasSize = Math.ceil(radius * 2.18);
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = canvasSize;
  cloudCanvas.height = canvasSize;
  const cloudCtx = cloudCanvas.getContext('2d');

  if (!cloudCtx) {
    return;
  }

  ctx.save();

  const ambient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 1.22);
  ambient.addColorStop(0, rgba(orb.inner, 0.24));
  ambient.addColorStop(0.42, rgba(orb.mid, 0.2));
  ambient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = ambient;
  ctx.translate(x, y);
  ctx.fillRect(-radius * 1.55, -radius * 1.55, radius * 3.1, radius * 3.1);
  ctx.restore();

  cloudCtx.save();
  cloudCtx.translate(canvasSize / 2, canvasSize / 2);

  const volume = cloudCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.98);
  volume.addColorStop(0, 'rgba(255, 250, 246, 0.08)');
  volume.addColorStop(0.5, 'rgba(255, 250, 246, 0.05)');
  volume.addColorStop(0.72, 'rgba(255, 255, 255, 0.12)');
  volume.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.fillStyle = volume;
  cloudCtx.fillRect(-radius * 1.15, -radius * 1.15, radius * 2.3, radius * 2.3);

  drawAuraBlob(cloudCtx, orb.mid, -radius * 0.34, radius * 0.04, radius * 0.88, 0.7);
  drawAuraBlob(cloudCtx, orb.outer, radius * 0.34, -radius * 0.06, radius * 0.92, 0.64);
  drawAuraBlob(cloudCtx, orb.inner, radius * 0.02, radius * 0.43, radius * 0.68, 0.43);
  drawAuraBlob(cloudCtx, orb.inner, -radius * 0.08, -radius * 0.38, radius * 0.62, 0.3);

  const softEdge = cloudCtx.createRadialGradient(0, 0, radius * 0.46, 0, 0, radius * 0.98);
  softEdge.addColorStop(0, 'rgba(255, 255, 255, 0)');
  softEdge.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
  softEdge.addColorStop(0.86, 'rgba(255, 255, 255, 0.18)');
  softEdge.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.fillStyle = softEdge;
  cloudCtx.fillRect(-radius * 1.14, -radius * 1.14, radius * 2.28, radius * 2.28);

  cloudCtx.globalCompositeOperation = 'destination-in';
  const mask = cloudCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.98);
  mask.addColorStop(0, 'rgba(0, 0, 0, 1)');
  mask.addColorStop(0.69, 'rgba(0, 0, 0, 1)');
  mask.addColorStop(0.74, 'rgba(0, 0, 0, 0)');
  mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
  cloudCtx.fillStyle = mask;
  cloudCtx.fillRect(-canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
  cloudCtx.restore();

  ctx.drawImage(cloudCanvas, x - canvasSize / 2, y - canvasSize / 2);
}

function drawShareCard(
  ctx: CanvasRenderingContext2D,
  { aura, matchPercentage, language }: ShareImageOptions,
  officialLogo: HTMLImageElement | null
) {
  const orb = auraOrbColors[aura.id] ?? { inner: '#f9a8d4', mid: '#e9d5ff', outer: '#fbcfe8' };
  const meta = auraNumbers[aura.id] ?? { number: '000', colorLabel: '—', colorLabelEn: '—' };
  const keywords = auraKeywordsDisplay[aura.id] ?? { zh: '', en: '' };
  const quote = language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;
  const keywordText = language === 'en' ? keywords.en : keywords.zh;
  const colorLabel = language === 'en' ? meta.colorLabelEn : meta.colorLabel;
  const matchLabel = language === 'en' ? `Aura match ${matchPercentage}%` : `氣場吻合度 ${matchPercentage}%`;
  const footerLabel = language === 'en' ? 'Personalized Skin Aura Analysis' : '個人化肌膚氣場分析';
  const ctaLabel = language === 'en' ? 'Zenshil Skin Aura Test' : 'Zenshil 肌膚氣場測試';

  ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const baseGradient = ctx.createLinearGradient(0, 0, 0, CARD_HEIGHT);
  baseGradient.addColorStop(0, '#fbfaf7');
  baseGradient.addColorStop(0.48, '#f8f4ef');
  baseGradient.addColorStop(1, '#f5efe8');
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const bgA = ctx.createRadialGradient(520, 220, 0, 520, 220, 660);
  bgA.addColorStop(0, rgba(orb.inner, 0.34));
  bgA.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = bgA;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const bgB = ctx.createRadialGradient(170, 1220, 0, 170, 1220, 560);
  bgB.addColorStop(0, rgba(orb.mid, 0.18));
  bgB.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = bgB;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const bgC = ctx.createRadialGradient(930, 1240, 0, 930, 1240, 520);
  bgC.addColorStop(0, rgba(orb.outer, 0.18));
  bgC.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = bgC;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  drawOfficialLogo(ctx, officialLogo);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#a8a29e';
  ctx.font = '500 22px Arial, sans-serif';
  ctx.fillText('SKIN AURA REPORT', 540, 326);

  drawPill(ctx, matchLabel, 540, 450);

  drawShareAuraCloud(ctx, orb, 540, 840, 292);

  ctx.fillStyle = '#1c1917';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '500 82px Georgia, serif';
  ctx.fillText(aura.name, 540, 1254);

  ctx.fillStyle = '#78716c';
  ctx.font = 'italic 36px Georgia, serif';
  ctx.fillText(aura.chineseName, 540, 1332);

  ctx.fillStyle = '#57534e';
  drawFittedSingleLineText(
    ctx,
    `“${quote}”`,
    540,
    1432,
    910,
    language === 'en' ? 30 : 36,
    language === 'en' ? 22 : 27,
    'Georgia, "Times New Roman", serif'
  );

  drawPill(ctx, `AURA NO. ${meta.number}`, 380, 1606, 38);
  drawPill(ctx, colorLabel, 670, 1606, 38);

  ctx.font = '500 28px Arial, sans-serif';
  drawPill(ctx, keywordText, 540, 1698, 42);

  ctx.fillStyle = '#a8a29e';
  ctx.font = '500 22px Arial, sans-serif';
  ctx.fillText(footerLabel, 540, 1812);

  ctx.fillStyle = '#78716c';
  ctx.font = '500 26px Georgia, serif';
  ctx.fillText(ctaLabel, 540, 1858);
}

export async function createResultShareImage(options: ShareImageOptions) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas is not available in this browser.');
  }

  let officialLogo: HTMLImageElement | null = null;

  try {
    officialLogo = await loadImage(OFFICIAL_LOGO_PATH);
  } catch {
    officialLogo = null;
  }

  drawShareCard(ctx, options, officialLogo);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.92);
  });

  if (!blob) {
    throw new Error('Unable to create share image.');
  }

  return blob;
}
