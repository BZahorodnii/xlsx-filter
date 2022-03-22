import { atom } from 'nanostores';

export const uniqueKeys = atom([]);

export function addUniqueKeys(arr: string[]) {
  uniqueKeys.set(arr);
}
