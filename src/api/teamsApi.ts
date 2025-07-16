import axios from "./axiosInstance";
import type { CreatePostPayload } from "../types/api";

export const getPosts = async () => {
  const res = await axios.get("/teams");
  return res.data;
};

export const createPost = async (data: CreatePostPayload) => {
  const res = await axios.post("/teams", data);
  return res.data;
};