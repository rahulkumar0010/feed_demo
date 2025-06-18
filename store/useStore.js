import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        darkMode: false,
        modalVisible: false,
        feedFilter: 'all',

        setUser: (user) => set({ user }),
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        setModalVisible: (visible) => set({ modalVisible: visible }),
        setFeedFilter: (filter) => set({ feedFilter: filter }),
      }),
      { name: 'app-storage' }
    )
  )
);