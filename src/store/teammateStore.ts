import {create} from "zustand";
import type {User} from "./userStore.ts";

export interface TeammateStore{
	teammates:User[];
	setTeammates:(users:User[]) => void;
	clearTeammates:()=>void;
}

export const useTeammateStore = create<TeammateStore>((set) => ({
	teammates: [] ,
	setTeammates: (users) => set({ teammates: users }),
	clearTeammates: () => set({ teammates: []  }),
}));