import { create } from "zustand";

interface SelectionState {
  blockStartIdx: number;
  blockMovingIdx: number;
  indices: number[];
  setIndices: (number) => void;
  setBlockStartIdx: (number) => void;
  setBlockMovingIdx: (number) => void;
  resetSelection: () => void;
}

const initialState = {
  blockStartIdx: -1,
  blockMovingIdx: -1,
  indices: [],
};

export const useSelectionStore = create<SelectionState>()((set) => ({
  blockStartIdx: -1,
  blockMovingIdx: -1,
  indices: [],
  setBlockStartIdx: (val) => {
    set((state) => ({ blockStartIdx: val }));
  },
  setBlockMovingIdx: (val) => {
    set((state) => {
      let _indices = [];
      Array.from({ length: val - state.blockStartIdx }).forEach((__, idx) => {
        _indices.push(idx + state.blockStartIdx);
      });
      return { blockMovingIdx: val, indices: [..._indices] };
    });
  },
  setIndices: (val) => {
    set((state) => {
      let _indices = [...state.indices];
      let isIndexSelected = _indices.find((i) => i == val);
      if (isIndexSelected) {
        _indices = _indices.filter((i) => i != val);
      } else {
        _indices.push(val);
      }
      return { indices: _indices.sort() };
    });
  },
  resetSelection: () => {
    set((state) => ({ ...initialState }));
  },
}));
