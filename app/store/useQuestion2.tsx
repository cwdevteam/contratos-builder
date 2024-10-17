import {create} from 'zustand';

// needs to store song title
interface SplitsState {
  song: string;
  recording: string;
  updateSong: (value : string) => void;
  updateRecording: (value: string) => void;
} 

const useQuestion2 = create<SplitsState>((set) => ({
  song: "",
  updateSong: (value) => set({ song: value }),
  recording: "",
  updateRecording: (value) => set({ recording: value }),
}));

export default useQuestion2;
