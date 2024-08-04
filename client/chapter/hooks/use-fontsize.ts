import { create } from "zustand";

type FontSize = {
  fontsize: number;
  increaseDisabled: boolean;
  decreaseDisabled: boolean;

  increase: () => void;
  decrease: () => void;
  set: (size: "default" | "small" | "medium" | "large") => void;
};

export const useFontsize = create<FontSize>((set) => ({
  fontsize: 1,
  decreaseDisabled: false,

  increaseDisabled: false,
  increase: () =>
    set((state) => {
      const newSize = state.fontsize + 0.05;
      if (newSize < 1.5) {
        return { fontsize: newSize, decreaseDisabled: false, increaseDisabled: false };
      } else {
        return { increaseDisabled: true };
      }
    }),
  decrease: () =>
    set((state) => {
      const newSize = state.fontsize - 0.05;
      if (newSize > 0.4) {
        return { fontsize: newSize, decreaseDisabled: false, increaseDisabled: false };
      } else {
        return { decreaseDisabled: true };
      }
    }),
  set: (size) =>
    set(() => {
      switch (size) {
        case "large":
          return { fontsize: 1 };
        case "medium":
          return { fontsize: 0.75 };
        case "small":
          return { fontsize: 0.6 };
        case "default":
          return { fontsize: 0.4 };

        default:
          return { fontsize: 0.4 };
      }
    }),
}));
