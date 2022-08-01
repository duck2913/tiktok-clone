import create from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../types";

interface StoreState {
	userProfile: IUser;
	addUser: (user: any) => void;
	removeUser: () => void;
}

const authStore = (set: any) => ({
	userProfile: null,
	addUser: (user: any) => set({ userProfile: user }),
	removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create<StoreState>()(
	persist(authStore, {
		name: "auth",
		getStorage: () => ({
			setItem: (...args) => window.localStorage.setItem(...args),
			removeItem: (...args) => window.localStorage.removeItem(...args),
			getItem: async (...args) =>
				new Promise((resolve) => {
					if (typeof window === "undefined") {
						resolve(null);
					} else {
						setTimeout(() => {
							resolve(window.localStorage.getItem(...args));
						}, 0);
					}
				}),
		}),
	}),
);

export default useAuthStore;
