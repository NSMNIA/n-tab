export function generatePastelColor(rgb: number[]) {
    const r = Math.floor((rgb[0] + 255) / 2);
    const g = Math.floor((rgb[1] + 255) / 2);
    const b = Math.floor((rgb[2] + 255) / 2);
    if (r < 160 && g < 160 && b < 160) {
        return `rgb(${r + 50},${g + 50},${b + 50})`;
    }
    return `rgb(${r},${g},${b})`;
}
