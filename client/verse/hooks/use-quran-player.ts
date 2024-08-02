import { AVAILABLE_READERS } from "@/constants";
import { create } from "zustand";

type OnOpenProps = {
  chapterId: number;
  verseId: number;
  totalVerses: number;
};

type QuranPlayer = {
  isOpen: boolean;
  chapterId?: number;
  verseId?: number;
  totalVerses?: number;
  readerId: string;
  onOpen: (props: OnOpenProps) => void;
  onClose: () => void;
  setReaderId: (readerId: string) => void;
};

export const useQuranPlayer = create<QuranPlayer>()((set) => ({
  isOpen: false,
  readerId: AVAILABLE_READERS[0].id,
  onOpen: ({ chapterId, verseId, totalVerses }) => set({ isOpen: true, chapterId, verseId, totalVerses }),
  onClose: () => set({ isOpen: false, chapterId: undefined, verseId: undefined, totalVerses: undefined }),
  setReaderId: (readerId) => set({ readerId }),
}));
