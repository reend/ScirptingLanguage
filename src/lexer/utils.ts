export function isAlpha(src: string): boolean {
    return src.toUpperCase() !== src.toLowerCase();
}

export function isSkippable(str: string): boolean {
    return str === ' ' || str === '\n' || str === '\t';
}

export function isInt(src: string): boolean {
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}
