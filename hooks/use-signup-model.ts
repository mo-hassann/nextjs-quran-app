import { create } from "zustand";

type SignupModel = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSignupModel = create<SignupModel>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
