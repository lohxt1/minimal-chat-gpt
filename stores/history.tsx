import { nanoid } from "nanoid";
import create from "zustand";
import { persist } from "zustand/middleware";

interface HistoryState {
  currentChatId: string;
  setCurrentChatId: (val?) => void;
  history: any;
  messages: any;
  sliceMessages: (val) => void;
  setHistory: (val) => void;
  deleteHistory: (val) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      currentChatId: null,
      messages: [],
      setCurrentChatId: (val) => {
        set((state) => ({
          currentChatId: val || nanoid(),
          messages: val ? state.history[val] : [],
        }));
      },
      history: {},
      sliceMessages: (idx) => {
        set((state) => {
          let _history = { ...state.history };
          if (state.currentChatId) {
            let _messages = _history[state.currentChatId].slice(0, idx + 1);
            _history[state.currentChatId] = _messages;
            return { history: _history, messages: _messages };
          }
        });
      },
      setHistory: (val) => {
        set((state) => {
          let _history = { ...state.history };
          if (state.currentChatId) {
            _history[state.currentChatId] = val;
            return { history: _history, messages: val || [] };
          } else {
            let _currentChatId = nanoid();
            _history[_currentChatId] = val;
            return {
              history: _history,
              currentChatId: _currentChatId,
              messages: val || [],
            };
          }
        });
      },
      deleteHistory: (val) => {
        set((state) => {
          let _history = { ...state.history };
          delete _history[val];

          let _messages = [...state.messages];
          if (val == state.currentChatId) {
            _messages = [];
          }
          return {
            history: _history,
            messages: _messages,
          };
        });
      },
    }),
    {
      name: "history",
    },
  ),
);
