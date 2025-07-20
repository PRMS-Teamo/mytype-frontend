export interface Team {
	teamId: string;
	userId: string;
	title: string;
	content: string;
	isPublic: boolean;
	location?: string;
	recruitStatus: "OPEN" | "CLOSE";
	proceedType: "ONLINE" | "OFFLINE" | "BOTH";
	imgUrl?: string;
	positions: {
		positionId: string;
		positionName: string;
		count: number;
		recruitStatus: "OPEN" | "CLOSE";
		positionStacks: {
			stackId: string;
			stackName: string;
			imgUrl: string;
		}[];
	}[];
}