import { create } from "zustand";
import type { TeamResponse } from "../types/api.ts";

export interface TeammateStore {
	teams: TeamResponse[];
	setTeams: (teams: TeamResponse[]) => void;
	clearTeams: () => void;
}

export const useTeammateStore = create<TeammateStore>((set) => ({
	teams: [],
	setTeams: (teams: TeamResponse[]) => set({ teams }),
	clearTeams: () => set({ teams: [] }),
}));