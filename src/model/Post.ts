import type {Position} from "../hooks/usePositions";
import type {TechStackType} from "./TeckStack.ts";

export type PositionDetail = {
  position:Position
  //export type Position = {
  //   id: string
  //   name: string
  // }
  count: number;
  recruitStatus: "OPEN" | "CLOSE";
  positionStacks: TechStackType[];
  //export type TechStackType = {
  //   id: string
  //   name: string
  //   stackImg: string
  // }
};

export interface Post {
  teamId: string;
  userId: string;
  title: string;
  content: string;
  isPublic: boolean;
  location: string;
  recruitStatus: "OPEN" | "CLOSE";
  proceedType: string;
  endDate: string;
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
  proceedType: string;
  endDate: string;
  positions: {
    positionId: string;
    count: number;
    recruitStatus: "OPEN" | "CLOSE";
    positionStacks: string[];
  }[];}