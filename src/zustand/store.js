import { create } from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware';

export const useBearStore = create(
  persist(
    (set, get) => ({
      authToken,
      setAuthToken: authToken => set({authToken}),
      user,
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);