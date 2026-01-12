
import { create } from 'zustand';

interface AppState {
  addError: (error: string) => void;
}

export const useAppStore = create<AppState>(() => ({
  addError: (error) => console.error(error),
}));
