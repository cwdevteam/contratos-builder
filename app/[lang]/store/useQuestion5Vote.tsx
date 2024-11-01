import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// needs to store name of admin selection
interface SplitsState {
  percent: string;
  updatePercent: (value : string) => void;
}

const useQuestion5Vote = create<SplitsState>()(
  persist(
    (set) => ({
  percent: "",
  updatePercent: (value) => set({ percent: value }),
}),
{
  name: 'question5vote-storage',
  partialize: (state) => ({ percent: state.percent }) 
}
)
);

export default useQuestion5Vote;