import {create} from 'zustand';
import { persist } from 'zustand/middleware'

// needs to store song title
interface SplitsState {
  language: string;
  jurisdiction: string;
  updateLanguage: (value : string) => void;
  updateJurisdiction: (value: string) => void;
} 

const useJurisdiction = create<SplitsState>()(
  persist(
    (set) => ({
  language: "",
  updateLanguage: (value) => set({ language: value }),
  jurisdiction: "",
  updateJurisdiction: (value) => set({ jurisdiction: value }),
}),
{
  name: 'jurisdiction-storage',
  partialize: (state) => ({ song: state.language, recording: state.jurisdiction }) 
}
)
);

export default useJurisdiction;
