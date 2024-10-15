import { create } from 'zustand';

// needs to store name of admin selection
interface SplitsState {
  percent: string;
  updatePercent: (value : string) => void;
}

const useQuestion5Vote = create<SplitsState>((set) => ({
  percent: "",
  updatePercent: (value) => set({ percent: value }),
}));

export default useQuestion5Vote;