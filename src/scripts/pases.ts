// pases.ts
// Frases que dependen de la cantidad de pases: se arman solo acá.
export const palabraPases = (n: number) => (n === 1 ? "pase" : "pases");

export const textoEnSuHonor = (n: number) => `${palabraPases(n)} en su honor`;
