import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// needs to store vote or admin selection
interface SplitsState {
  voteSelection: string;
  updateVoteSelection: (value : string) => void;
}

const useQuestion4 = create<SplitsState>()(
  persist(
    (set) => ({
  voteSelection: "",
  updateVoteSelection: (value) => set({ voteSelection: value }),
}),
{
  name: 'question4-storage',
  partialize: (state) => ({ voteSelection: state.voteSelection }) 
}
)
);

export default useQuestion4;