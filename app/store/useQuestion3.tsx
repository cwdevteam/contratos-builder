import {create} from 'zustand';

// needs to store the number of contributors
interface SplitsState {
  contributorCount: number;
  updateContributorCount: (value : number) => void;
}

const useQuestion3 = create<SplitsState>((set) => ({
    contributorCount: 0,
  updateContributorCount: (value) => set({ contributorCount: value }),
}));

export default useQuestion3;
