import {create} from 'zustand';

// needs to store legalName, email, contributorType, and split %
interface PageData {
  legalName: string;
  email: string;
  contributorType: string;
  split: number;
}

// storing over dynamic pages dynamic pages
interface DynamicPageState {
  pages: { [id: number]: PageData }; // data is keyed by page id
  setPageData: (id: number, data: Partial<PageData>) => void; // Action to update data for a specific page
}

const useDynamicPageStore = create<DynamicPageState>((set) => ({
  pages: {}, // Initial state: an empty object to store page data
  setPageData: (id, data) =>
    set((state) => ({
      pages: {
        ...state.pages,
        [id]: { ...state.pages[id], ...data },
      },
    })),
}));

export default useDynamicPageStore;
