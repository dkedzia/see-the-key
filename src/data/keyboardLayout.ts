export interface SplitKey {
  main: string;
  alt: string;
}

export const POLISH_SPLIT_KEYS: Record<string, SplitKey> = {
  a: { main: 'a', alt: 'ą' },
  l: { main: 'l', alt: 'ł' },
  o: { main: 'o', alt: 'ó' },
  z: { main: 'z', alt: 'ż' },
  x: { main: 'x', alt: 'ź' },
  c: { main: 'c', alt: 'ć' },
  n: { main: 'n', alt: 'ń' },
  e: { main: 'e', alt: 'ę' },
};

export const ROW1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
export const ROW2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
export const ROW3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
export const ROW4 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
