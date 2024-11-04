import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// needs to store the number of contributors
interface SplitsState {
  contributorCount: number;
  updateContributorCount: (value : number) => void;
}

const useQuestion3 = create<SplitsState>()(
  persist(
    (set) => ({
    contributorCount: 0,
  updateContributorCount: (value) => set({ contributorCount: value }),
}),
{
  name: 'question3-storage',
  partialize: (state) => ({ contributorCount: state.contributorCount }) 
}
)
);

export default useQuestion3;
