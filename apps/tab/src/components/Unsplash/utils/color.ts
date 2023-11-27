export function generatePastelColor(rgb: number[]) {
  const r = Math.floor((rgb[0] + 255) / 2);
  const g = Math.floor((rgb[1] + 255) / 2);
  const b = Math.floor((rgb[2] + 255) / 2);
  const hsl = RGBToHSL({ r, g, b });
  const [h, s, l] = hsl;
  return `${h} ${s}% ${l < 70 ? l + 10 : l}%`;
}

const RGBToHSL = ({ r, g, b }: { r: number; g: number; b: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
