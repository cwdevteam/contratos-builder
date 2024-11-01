import {create} from 'zustand';
import { persist } from 'zustand/middleware'

// needs to store song title
interface SplitsState {
  song: string;
  recording: string;
  updateSong: (value : string) => void;
  updateRecording: (value: string) => void;
} 

const useQuestion2 = create<SplitsState>()(
  persist(
    (set) => ({
  song: "",
  updateSong: (value) => set({ song: value }),
  recording: "",
  updateRecording: (value) => set({ recording: value }),
}),
{
  name: 'question2-storage',
  partialize: (state) => ({ song: state.song, recording: state.recording }) 
}
)
);

export default useQuestion2;
