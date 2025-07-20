import type {Position} from "../hooks/usePositions";
import type {TechStackType} from "./TeckStack.ts";

export type PositionDetail = {
  position:Position
  count: number;
  recruitStatus: "OPEN" | "CLOSE";
  positionStacks: TechStackType[];
};

export interface Post {
  teamId: string;
  userId: string;
  title: string;
  content: string;
  isPublic: boolean;
  location: string;
  recruitStatus: "OPEN" | "CLOSE";
  proceedType: "BOTH" | "ONLINE" | "OFFLINE";
  endTime: string;
  positions: PositionDetail[];
}


export interface PostPayload {
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