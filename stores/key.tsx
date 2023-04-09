import create from "zustand";
import { persist } from "zustand/middleware";

interface KeyState {
  apikey: string;
  editApikey: boolean;
  setApikey: (val) => void;
  toggleEditApikey: (val) => void;
}

export const useKeyStore = create<KeyState>()(
  persist(
    (set) => ({
      apikey: null,
      editApikey: false,
      setApikey: (val) => {
        set((state) => ({ apikey: val }));
      },
      toggleEditApikey: (val) => {
        set((state) => ({ editApikey: val }));
      },
    }),
    {
      name: "key",
    },
  ),
);
