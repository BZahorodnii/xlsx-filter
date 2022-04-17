import { atom } from 'nanostores';

export const initialSheet = atom([]);

export const addInitialSheet = (sheetItems: any[][]) => {
  initialSheet.set(sheetItems);
}
