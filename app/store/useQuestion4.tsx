import { create } from 'zustand';

// needs to store vote or admin selection
interface SplitsState {
  voteSelection: string;
  updateVoteSelection: (value : string) => void;
}

const useQuestion4 = create<SplitsState>((set) => ({
  voteSelection: "",
  updateVoteSelection: (value) => set({ voteSelection: value }),
}));

export default useQuestion4;