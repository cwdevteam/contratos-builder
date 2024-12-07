import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SplitsState {
  split: string;
  date: string;
  userId:string;
  updateSplit: (value: string) => void;
  updateDate: (value: string) => void;
  setUserId: (value:string) => void;
}

const useQuestion1 = create<SplitsState>()(
  persist(
    (set) => ({
      split: "",
      date: "",
      userId:"",
      updateSplit: (value) => set({ split: value }),
      updateDate: (value) => set({ date: value }),
      setUserId: (value) => set({ userId: value }),
    }),
    {
      name: 'question1-storage',
      partialize: (state) => ({ split: state.split, date: state.date }) 
    }
  )
);

export default useQuestion1;
