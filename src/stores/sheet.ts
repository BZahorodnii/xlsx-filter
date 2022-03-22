import { atom } from 'nanostores';

export const sheet = atom([]);

export function addSheet(sheetItems: any[][]) {
  sheet.set(sheetItems);
}
