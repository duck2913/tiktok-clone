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
	addUser: (user: any) => {
		set({ userProfile: user });
	},
	removeUser: () => {
		set({ userProfile: null });
	},
});

const useAuthStore = create<StoreState>()(
	persist(authStore, {
		name: "authStore",
	}),
);

export default useAuthStore;
