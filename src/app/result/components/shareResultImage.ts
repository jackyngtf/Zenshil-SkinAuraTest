import {
  auraLensPalettes,
  auraNumbers,
  getOrbColors,
  auraSymbols,
  getAuraIdentity,
  type AuraLensPalette,
} from '@/data/resultData';

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

interface PillMetrics {
  fontSize: number;
  textWidth: number;
  width: number;
}

interface PillSpec {
  text: string;
  paddingX?: number;
  maxWidth?: number;
  maxFontSize?: number;
  minFontSize?: number;
}

function getPillMetrics(
  ctx: CanvasRenderingContext2D,
  text: string,
  paddingX = 34,
  maxWidth = 860,
  maxFontSize = 28,
  minFontSize = 18
): PillMetrics {
  let fontSize = maxFontSize;
  let textWidth = 0;

  while (fontSize >= minFontSize) {
    ctx.font = `500 ${fontSize}px Arial, sans-serif`;
    textWidth = ctx.measureText(text).width;

    if (textWidth <= maxWidth - paddingX * 2) {
      break;
    }

    fontSize -= 1;
  }

  const width = Math.min(textWidth + paddingX * 2, maxWidth);

  return { fontSize, textWidth, width };
}

function drawPill(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  paddingX = 34,
  maxWidth = 860,
  maxFontSize = 28,
  minFontSize = 18
) {
  const { fontSize, textWidth, width } = getPillMetrics(
    ctx,
    text,
    paddingX,
    maxWidth,
    maxFontSize,
    minFontSize
  );
  const height = 62;
  ctx.font = `500 ${fontSize}px Arial, sans-serif`;

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

  const availableTextWidth = width - paddingX * 2;
  if (textWidth > availableTextWidth) {
    ctx.save();
    ctx.translate(x, y + 1);
    ctx.scale(availableTextWidth / textWidth, 1);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  } else {
    ctx.fillText(text, x, y + 1);
  }

  ctx.restore();
}

function drawCenteredPillRow(
  ctx: CanvasRenderingContext2D,
  pills: PillSpec[],
  centerX: number,
  y: number,
  gap = 24
) {
  const metrics = pills.map((pill) => getPillMetrics(
    ctx,
    pill.text,
    pill.paddingX,
    pill.maxWidth,
    pill.maxFontSize,
    pill.minFontSize
  ));
  const totalWidth = metrics.reduce((sum, metric) => sum + metric.width, 0) + gap * (pills.length - 1);
  let cursorX = centerX - totalWidth / 2;

  pills.forEach((pill, index) => {
    const metric = metrics[index];

    drawPill(
      ctx,
      pill.text,
      cursorX + metric.width / 2,
      y,
      pill.paddingX,
      pill.maxWidth,
      pill.maxFontSize,
      pill.minFontSize
    );
    cursorX += metric.width + gap;
  });
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

function drawShareAuraLens(
  ctx: CanvasRenderingContext2D,
  lens: AuraLensPalette,
  x: number,
  y: number,
  radius: number
) {
  const canvasSize = Math.ceil(radius * 2.24);
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = canvasSize;
  cloudCanvas.height = canvasSize;
  const cloudCtx = cloudCanvas.getContext('2d');

  if (!cloudCtx) {
    return;
  }

  ctx.save();

  const ambient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 1.22);
  ambient.addColorStop(0, rgba(lens.core, 0.3));
  ambient.addColorStop(0.42, rgba(lens.soft, 0.2));
  ambient.addColorStop(0.68, rgba(lens.edge, 0.14));
  ambient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = ambient;
  ctx.translate(x, y);
  ctx.fillRect(-radius * 1.64, -radius * 1.64, radius * 3.28, radius * 3.28);
  ctx.restore();

  cloudCtx.save();
  cloudCtx.translate(canvasSize / 2, canvasSize / 2);
  cloudCtx.beginPath();
  cloudCtx.arc(0, 0, radius * 0.96, 0, Math.PI * 2);
  cloudCtx.clip();

  const base = cloudCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.98);
  base.addColorStop(0, 'rgba(255, 252, 248, 0.2)');
  base.addColorStop(0.58, rgba(lens.core, 0.12));
  base.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
  cloudCtx.fillStyle = base;
  cloudCtx.fillRect(-radius, -radius, radius * 2, radius * 2);

  drawAuraBlob(cloudCtx, lens.soft, -radius * 0.36, radius * 0.11, radius * 0.86, 0.84);
  drawAuraBlob(cloudCtx, lens.core, radius * 0.32, radius * 0.02, radius * 0.9, 0.82);
  drawAuraBlob(cloudCtx, lens.edge, radius * 0.42, -radius * 0.3, radius * 0.72, 0.62);
  drawAuraBlob(cloudCtx, lens.warm, radius * 0.04, radius * 0.58, radius * 0.58, 0.52);
  drawAuraBlob(cloudCtx, lens.shadow, -radius * 0.3, radius * 0.42, radius * 0.54, 0.42);

  const angle = (lens.angle * Math.PI) / 180;
  const dx = Math.cos(angle) * radius * 1.34;
  const dy = Math.sin(angle) * radius * 1.34;
  const phase = cloudCtx.createLinearGradient(-dx, -dy, dx, dy);
  phase.addColorStop(0, 'rgba(255, 255, 255, 0)');
  phase.addColorStop(0.32, rgba(lens.edge, 0.08));
  phase.addColorStop(0.42, rgba(lens.band, 0.58));
  phase.addColorStop(0.49, rgba(lens.band, 0.9));
  phase.addColorStop(0.55, rgba(lens.core, 0.5));
  phase.addColorStop(0.63, rgba(lens.shadow, 0.42));
  phase.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.globalAlpha = 0.96;
  cloudCtx.filter = 'blur(5px) saturate(1.14) contrast(1.04)';
  cloudCtx.fillStyle = phase;
  cloudCtx.fillRect(-radius * 1.3, -radius * 1.3, radius * 2.6, radius * 2.6);
  cloudCtx.filter = 'none';
  cloudCtx.globalAlpha = 1;

  const depth = cloudCtx.createRadialGradient(-radius * 0.28, radius * 0.46, 0, -radius * 0.28, radius * 0.46, radius * 0.72);
  depth.addColorStop(0, rgba(lens.shadow, 0.2));
  depth.addColorStop(0.55, rgba(lens.shadow, 0.1));
  depth.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.globalCompositeOperation = 'multiply';
  cloudCtx.fillStyle = depth;
  cloudCtx.fillRect(-radius, -radius, radius * 2, radius * 2);

  const sideDepth = cloudCtx.createRadialGradient(radius * 0.74, radius * 0.06, 0, radius * 0.74, radius * 0.06, radius * 0.56);
  sideDepth.addColorStop(0, rgba(lens.shadow, 0.16));
  sideDepth.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.fillStyle = sideDepth;
  cloudCtx.fillRect(-radius, -radius, radius * 2, radius * 2);
  cloudCtx.globalCompositeOperation = 'source-over';

  const highlight = cloudCtx.createRadialGradient(-radius * 0.16, -radius * 0.22, 0, -radius * 0.16, -radius * 0.22, radius * 0.46);
  highlight.addColorStop(0, 'rgba(255, 255, 255, 0.58)');
  highlight.addColorStop(0.34, 'rgba(255, 255, 255, 0.22)');
  highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cloudCtx.fillStyle = highlight;
  cloudCtx.fillRect(-radius, -radius, radius * 2, radius * 2);

  cloudCtx.globalCompositeOperation = 'destination-in';
  const mask = cloudCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.98);
  mask.addColorStop(0, 'rgba(0, 0, 0, 1)');
  mask.addColorStop(0.82, 'rgba(0, 0, 0, 1)');
  mask.addColorStop(0.96, 'rgba(0, 0, 0, 0.76)');
  mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
  cloudCtx.fillStyle = mask;
  cloudCtx.fillRect(-canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
  cloudCtx.restore();

  ctx.drawImage(cloudCanvas, x - canvasSize / 2, y - canvasSize / 2);

  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = rgba(lens.edge, 0.28);
  ctx.shadowBlur = 32;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawShareCard(
  ctx: CanvasRenderingContext2D,
  { aura, language }: ShareImageOptions,
  officialLogo: HTMLImageElement | null
) {
  const orb = getOrbColors(aura.id);
  const lens = auraLensPalettes[aura.id] ?? auraLensPalettes.glow;
  const meta = auraNumbers[aura.id] ?? { number: '000', colorLabel: '—', colorLabelEn: '—' };
  const identity = getAuraIdentity(aura.id);
  const symbol = auraSymbols[aura.id] ?? {
    labelZh: '氣場核心',
    labelEn: 'Aura Core',
    coreZh: '個人節奏',
    coreEn: 'Personal Rhythm',
  };
  const title = language === 'en'
    ? identity?.displayName ?? aura.name
    : identity?.displayNameZh ?? aura.chineseName;
  const subtitle = language === 'en'
    ? identity?.displayNameZh ?? aura.chineseName
    : identity?.displayName ?? aura.name;
  const quote = identity
    ? language === 'en' ? identity.shortLine : identity.shortLineZh
    : language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;
  const symbolLabel = language === 'en' ? symbol.labelEn : symbol.labelZh;
  const auraCore = language === 'en' ? symbol.coreEn : symbol.coreZh;
  const reportLabel = language === 'en' ? 'SKIN AURA IDENTITY' : 'SKIN AURA IDENTITY';
  const footerLabel = language === 'en' ? 'Personal Skin & Lifestyle Discovery' : '個人化肌膚氣場探索';
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
  ctx.fillText(reportLabel, 540, 326);

  drawShareAuraLens(ctx, lens, 540, 752, 286);

  ctx.fillStyle = '#1c1917';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawFittedSingleLineText(
    ctx,
    title,
    540,
    1164,
    920,
    language === 'en' ? 78 : 86,
    language === 'en' ? 48 : 56,
    'Georgia, "Times New Roman", serif'
  );

  ctx.fillStyle = '#78716c';
  drawFittedSingleLineText(
    ctx,
    subtitle,
    540,
    1248,
    790,
    language === 'en' ? 34 : 36,
    26,
    'Georgia, "Times New Roman", serif'
  );

  drawCenteredPillRow(
    ctx,
    [
      { text: `AURA NO. ${meta.number}`, paddingX: 38, maxWidth: 330 },
      { text: symbolLabel, paddingX: 38, maxWidth: 340 },
    ],
    540,
    1342,
    24
  );

  drawPill(
    ctx,
    language === 'en' ? `Aura Core · ${auraCore}` : `Aura Core · ${auraCore}`,
    540,
    1426,
    42,
    760,
    language === 'en' ? 24 : 28,
    18
  );

  ctx.fillStyle = '#57534e';
  drawFittedSingleLineText(
    ctx,
    `“${quote}”`,
    540,
    1538,
    language === 'en' ? 860 : 900,
    language === 'en' ? 30 : 35,
    language === 'en' ? 22 : 27,
    'Georgia, "Times New Roman", serif'
  );

  ctx.fillStyle = '#a8a29e';
  ctx.font = '500 22px Arial, sans-serif';
  ctx.fillText(footerLabel, 540, 1744);

  ctx.fillStyle = '#78716c';
  ctx.font = '500 26px Georgia, serif';
  ctx.fillText(ctaLabel, 540, 1788);
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
