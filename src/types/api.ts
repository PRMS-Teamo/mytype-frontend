export interface TeamStack {
  stackId: string;
  stackName: string;
  imgUrl: string;
}

export interface TeamResponse {
  teamId: string;
  title: string;
  content: string;
  userId: string;
  isPublic: boolean;
  recruitStatus: "OPEN" | "CLOSED"; 
  proceedType: "ONLINE" | "OFFLINE" | "BOTH"; 
  imgUrl: string;
  teamStacks: {
    stackId: string;
    stackName: string;
    imgUrl: string;
  }[];
}

export interface Stack {
  stackId: string;
  stackName: string;
  imgUrl: string;
}

export interface Position {
  positionId: string;
  positionName: string;
  count: number;
  users?: string[]; 
  positionStacks: Stack[];
}

export interface CreatePostPayload {
  title: string;
  content: string;
  proceedType: "ONLINE" | "OFFLINE" | "BOTH";
  imgUrl?: string;
  isPublic: boolean;
  recruitStatus: "OPEN" | "CLOSED";
  endDate: string; 
  positions: Position[];
}