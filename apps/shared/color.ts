import { Color } from '../background/src/types';

export function rgba(color: string | number[]): Color | null | undefined {
  if (typeof color === 'string') {
    const canvas = document.createElement('canvas').getContext('2d');
    if (canvas) {
      canvas.fillStyle = color;
      let colorTemp = canvas.fillStyle;
      if (colorTemp.startsWith('#')) {
        let r = colorTemp[1] + colorTemp[2];
        let g = colorTemp[3] + colorTemp[4];
        let b = colorTemp[5] + colorTemp[6];

        return {
          r: parseInt(r, 16),
          g: parseInt(g, 16),
          b: parseInt(b, 16),
          a: 1,
        };
      } else {
        let result = colorTemp.match(/[.?\d]+/g)?.map(Number) || [];
        return {
          r: result[0],
          g: result[1],
          b: result[2],
          a: result[3],
        };
      }
    }
  } else if (typeof color === 'object' && Array.isArray(color)) {
    return { r: color[0], g: color[1], b: color[2], a: color[3] };
  } else {
    return null;
  }
}

export function dimColor(color: Color, dim: number): string {
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

export function overlayColor(colorTop: Color, colorBottom: Color): object {
  let a = (1 - colorTop.a) * colorBottom.a + colorTop.a;
  if (a === 0) {
    return rgba([236, 236, 236, 0]) as object;
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
