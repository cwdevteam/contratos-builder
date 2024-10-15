import {create} from 'zustand';

// needs to store song title
interface SplitsState {
  song: string;
  updateSong: (value : string) => void;
}

const useQuestion2 = create<SplitsState>((set) => ({
  song: "",
  updateSong: (value) => set({ song: value }),
}));

export default useQuestion2;
