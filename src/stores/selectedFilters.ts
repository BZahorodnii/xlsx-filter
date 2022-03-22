import { atom } from 'nanostores';

export const selectedFilters = atom<string[]>([]);

export function addSelectedFilters(filters: string[]) {
  selectedFilters.set(filters);
}
