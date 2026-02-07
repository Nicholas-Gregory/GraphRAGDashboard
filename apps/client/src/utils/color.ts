/**
 * Parse a hex or rgb(a) color string into components.
 */
function parseColor(input: string) {
	const s = input.trim();
	// hex formats: #rgb, #rgba, #rrggbb, #rrggbbaa
	if (s.startsWith('#')) {
		const hex = s.slice(1);
		let r = 0, g = 0, b = 0, a: number | undefined = undefined;
		if (hex.length === 3) {
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
		} else if (hex.length === 4) {
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
			a = parseInt(hex[3] + hex[3], 16) / 255;
		} else if (hex.length === 6) {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		} else if (hex.length === 8) {
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
			a = parseInt(hex.slice(6, 8), 16) / 255;
		}
		return { r, g, b, a, format: 'hex', original: s };
	}

	// rgb / rgba formats: rgb(r,g,b) or rgba(r,g,b,a)
	const rgbMatch = s.match(/^(rgba?)\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+)\s*)?\)$/i);
	if (rgbMatch) {
		const isRgba = rgbMatch[1].toLowerCase() === 'rgba';
		const r = Number(rgbMatch[2]);
		const g = Number(rgbMatch[3]);
		const b = Number(rgbMatch[4]);
		const a = isRgba && rgbMatch[5] !== undefined ? Number(rgbMatch[5]) : undefined;
		return { r, g, b, a, format: isRgba ? 'rgba' : 'rgb', original: s };
	}

	// fallback: attempt to return black
	return { r: 0, g: 0, b: 0, a: undefined, format: 'rgb', original: s };
}

function clamp(n: number, min = 0, max = 255) {
	return Math.min(max, Math.max(min, Math.round(n)));
}

function toHex(n: number) {
	return clamp(n).toString(16).padStart(2, '0');
}

/**
 * Convert components back to hex string. If alpha is provided, include it.
 */
function toHexString(r: number, g: number, b: number, a?: number) {
	if (a === undefined) return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	const aa = clamp(Math.round(a * 255), 0, 255);
	return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(aa)}`;
}

/**
 * Convert components back to rgb/rgba string.
 */
function toRgbString(r: number, g: number, b: number, a?: number) {
	if (a === undefined) return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
	return `rgba(${clamp(r)}, ${clamp(g)}, ${clamp(b)}, ${Math.max(0, Math.min(1, a))})`;
}

/**
 * Darken a color by percentage amount (0-100). Supports hex and rgb/rgba input;
 * returns the color in the same format it was provided.
 */
export function darken(color: string, amount: number): string {
	const p = Math.max(0, Math.min(100, amount)) / 100;
	const c = parseColor(color);
	// move each channel toward 0 by p
	const r = clamp(c.r * (1 - p));
	const g = clamp(c.g * (1 - p));
	const b = clamp(c.b * (1 - p));
	const a = c.a;
	if (c.format === 'hex') return toHexString(r, g, b, a);
	return toRgbString(r, g, b, a);
}

/**
 * Lighten a color by percentage amount (0-100). Supports hex and rgb/rgba input;
 * returns the color in the same format it was provided.
 */
export function lighten(color: string, amount: number): string {
	const p = Math.max(0, Math.min(100, amount)) / 100;
	const c = parseColor(color);
	// move each channel toward 255 by p
	const r = clamp(c.r + (255 - c.r) * p);
	const g = clamp(c.g + (255 - c.g) * p);
	const b = clamp(c.b + (255 - c.b) * p);
	const a = c.a;
	if (c.format === 'hex') return toHexString(r, g, b, a);
	return toRgbString(r, g, b, a);
}

export function shadedBorders(color: string, borderShade: number) {
  return {
    borderTopColor: lighten(color, borderShade),
    borderLeftColor: lighten(color, borderShade),
    borderBottomColor: darken(color, borderShade),
    borderRightColor: darken(color, borderShade),
  }
}