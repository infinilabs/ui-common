 
import { create } from 'zustand';

interface ConnectState {
  currentAssistant: any;
  assistantList: any[];
  currentService: any;
  setAssistant: (assistant: any) => void;
}

export const useConnectStore = create<ConnectState>((set) => ({
  currentAssistant: {},
  assistantList: [],
  currentService: { id: 'mock-service-id' },
  setAssistant: (assistant) => set({ currentAssistant: assistant }),
}));
