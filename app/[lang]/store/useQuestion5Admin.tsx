import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// needs to store name of admin selection
interface SplitsState {
  adminName: string;
  updateAdminName: (value : string) => void;
}

const useQuestion5Admin = create<SplitsState>()(
  persist(
    (set) => ({
  adminName: "",
  updateAdminName: (value) => set({ adminName: value }),
}),
{
  name: 'question5admin-storage',
  partialize: (state) => ({ adminName: state.adminName }) 
}
)
);

export default useQuestion5Admin;