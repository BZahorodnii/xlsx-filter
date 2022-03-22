import { atom } from 'nanostores';

export const maxColsNumber = atom(0);

export function rewriteMaxColsNumber(number: null) {
  maxColsNumber.set(number);
}
