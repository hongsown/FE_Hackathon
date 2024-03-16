import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface WasteState {
  dataWaste: any;
  updateWasteState: (newState: any) => void;
}
export const useWasteStore = create(
  persist(
    (set) => ({
      dataWaste: {},
      updateWasteState: (newState: WasteState) => set({ dataWaste: newState }),
    }),
    {
      name: 'waste-storage', // unique name
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
