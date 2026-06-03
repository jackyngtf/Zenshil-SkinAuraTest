export function seededNumber(seed: number, min: number, max: number) {
  const raw = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  const normalized = raw - Math.floor(raw);
  return min + normalized * (max - min);
}

export function seededSign(seed: number) {
  return seededNumber(seed, 0, 1) >= 0.5 ? 1 : -1;
}
