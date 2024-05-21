import { create } from "zustand";

const store = (set) => ({
  activePage: "",
  setActivePage: (activePage) => set({ activePage }),
});

export const useStore = create(store);
