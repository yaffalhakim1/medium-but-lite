import { User } from "@/types/user-types";
import { create } from "zustand";

interface AuthStoreInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  user: User;
  setUser: (user: User) => void;
}

// create our store
const useAuthStore = create<AuthStoreInterface>((set) => ({
  isLoggedIn: false,
  user: {} as User,
  setIsLoggedIn: (val) => set((state) => ({ isLoggedIn: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}));

export default useAuthStore;
