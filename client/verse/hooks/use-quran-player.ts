import { AVAILABLE_READERS } from "@/lib/variables";
import { create } from "zustand";

type OnOpenProps = {
  chapterId: number;
  verseId: number;
};

type QuranPlayer = {
  isOpen: boolean;
  chapterId?: number;
  verseId?: number;
  readerId: string;
  onOpen: (props: OnOpenProps) => void;
  onClose: () => void;
  setReaderId: (readerId: string) => void;
};

export const useQuranPlayer = create<QuranPlayer>()((set) => ({
  isOpen: false,
  readerId: AVAILABLE_READERS[0].id,
  onOpen: ({ chapterId, verseId }) => set({ isOpen: true, chapterId, verseId }),
  onClose: () => set({ isOpen: false }),
  setReaderId: (readerId) => set({ readerId }),
}));
