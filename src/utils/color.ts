/** Genera un color en formato HSL para los degradados de avatares y miniaturas. */
export function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue % 360}, ${saturation}%, ${lightness}%)`;
}
