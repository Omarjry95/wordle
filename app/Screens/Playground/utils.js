export const getMatrix = (number, value) => {
    return Array.from({ length: number }, (v, k) => value !== undefined ? value : k);
}