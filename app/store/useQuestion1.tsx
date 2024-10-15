import {create} from 'zustand';

// needs to store split type and date
interface SplitsState {
  split: string;
  date: string;
  updateSplit: (value : string) => void;
  updateDate: (value : string) => void;
}

const useQuestion1 = create<SplitsState>((set) => ({
  split: "",
  date: "",
  updateSplit: (value) => set({ split: value }),
  updateDate: (value) => set({ split: value }),
}));

export default useQuestion1;
