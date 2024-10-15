import {create} from 'zustand';

// stores the type of split contract selected by the user
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
  updateDate: () => set({ split: "" }),
}));

export default useQuestion1;
