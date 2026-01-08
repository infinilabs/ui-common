 
import { create } from 'zustand';

export interface UploadAttachments {
  id: string;
  name: string;
  path: string;
  size: number;
  uploading?: boolean;
  uploaded?: boolean;
  uploadFailed?: boolean;
  failedMessage?: string;
  attachmentId?: string;
  [key: string]: any;
}

interface ChatState {
  synthesizeItem: any;
  setSynthesizeItem: (item: any) => void;
  uploadAttachments: UploadAttachments[];
  setUploadAttachments: (items: UploadAttachments[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  synthesizeItem: null,
  setSynthesizeItem: (item) => set({ synthesizeItem: item }),
  uploadAttachments: [],
  setUploadAttachments: (items) => set({ uploadAttachments: items }),
}));
