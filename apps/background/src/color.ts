export function rgba(color: number[]): object {
  return { r: color[0], g: color[1], b: color[2], a: color[3] };
}

export function dimColor(color: { r: number; g: number; b: number; a: number }, dim: number): string {
  let result = { ...color };
  if (dim > 0) {
    result.r = color.r + dim * (255 - color.r);
    result.g = color.g + dim * (255 - color.g);
    result.b = color.b + dim * (255 - color.b);
  } else if (dim < 0) {
    result.r = (dim + 1) * color.r;
    result.g = (dim + 1) * color.g;
    result.b = (dim + 1) * color.b;
  }
  return `rgb(${Math.floor(result.r)}, ${Math.floor(result.g)}, ${Math.floor(result.b)})`;
}

export function overlayColor(
  colorTop: { r: number; g: number; b: number; a: number },
  colorBottom: { r: number; g: number; b: number; a: number },
): object {
  let a = (1 - colorTop.a) * colorBottom.a + colorTop.a;
  if (a === 0) {
    return rgba([236, 236, 236, 0]);
  } else {
    return {
      r: ((1 - colorTop.a) * colorBottom.a * colorBottom.r + colorTop.a * colorTop.r) / a,
      g: ((1 - colorTop.a) * colorBottom.a * colorBottom.g + colorTop.a * colorTop.g) / a,
      b: ((1 - colorTop.a) * colorBottom.a * colorBottom.b + colorTop.a * colorTop.b) / a,
      a: a,
    };
  }
}

export function cc(
  target: { r: number; g: number; b: number; a: number },
  source: { r: number; g: number; b: number; a: number },
): void {
  target.r = source.r;
  target.g = source.g;
  target.b = source.b;
  target.a = source.a;
}
