import { create } from 'zustand';

// needs to store name of admin selection
interface SplitsState {
  adminName: string;
  updateAdminName: (value : string) => void;
}

const useQuestion5Admin = create<SplitsState>((set) => ({
  adminName: "",
  updateAdminName: (value) => set({ adminName: value }),
}));

export default useQuestion5Admin;