import { AVAILABLE_TAFSEER } from "@/constants";
import { create } from "zustand";

type Tafseer = {
  isOpen: boolean;
  onOpen: ({ chapterId, verseId }: { chapterId: number; verseId: number }) => void;
  onClose: () => void;
  tafseerId: number;
  verseId?: number;
  chapterId?: number;
  setTafseerId: (readerId: number) => void;
};

export const useTafseer = create<Tafseer>()((set) => ({
  isOpen: false,
  onOpen: ({ chapterId, verseId }) => set({ isOpen: true, chapterId, verseId }),
  onClose: () => set({ isOpen: false }),
  tafseerId: AVAILABLE_TAFSEER[0].id,
  setTafseerId: (tafseerId) => set({ tafseerId }),
}));
