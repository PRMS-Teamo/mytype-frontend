// export interface TeamStack {
//   stackId: string;
//   stackName: string;
//   imgUrl: string;
// }
//
// export interface TeamResponse {
//   teamId: string;
//   title: string;
//   content: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
//   endTime:string;
//   isPublic: boolean;
//   location:string;
//   recruitStatus: "OPEN" | "CLOSED";
//   proceedType: "ONLINE" | "OFFLINE" | "BOTH";
//   imgUrl: string;
//   teamStacks: {
//     id: string;
//     name: string;
//     img: string;
//   }[];
// }

export interface TeamResponse{
  teamId: string;
  userId: string;
  title: string;
  content: string;
  isPublic: boolean;
  location: string;
  recruitStatus: "OPEN" | "CLOSE";
  proceedType: "BOTH" | "ONLINE" | "OFFLINE";
  endTime: string;
  positions: {
    positionId: string;
    count: number;
    positionName:string;
    recruitStatus: "OPEN" | "CLOSE";
    positionStacks: {
      stackId: string;
      stackName:string;
      imgUrl:string;
    }[];
  }[];}
// export interface Stack {
//   stackId: string;
//   stackName: string;
//   imgUrl: string;
// }

// export interface Position {
//   positionId: string;
//   positionName: string;
//   count: number;
//   users?: string[];
//   positionStacks: Stack[];
// }

// export interface CreatePostPayload {
//   title: string;
//   content: string;
//   proceedType: "ONLINE" | "OFFLINE" | "BOTH";
//   imgUrl?: string;
//   isPublic: boolean;
//   recruitStatus: "OPEN" | "CLOSED";
//   endDate: string;
//   positions: Position[];
// }