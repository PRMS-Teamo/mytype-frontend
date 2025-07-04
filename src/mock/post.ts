import { http, HttpResponse } from "msw";
import { postMock } from "../mock/data/postMock";
import type { Post } from "../model/Post"; 

export const postHandlers = [

  http.get("/api/posts", () => {
    return HttpResponse.json(postMock);
  }),

  http.get("/api/posts/:id", ({ params }) => {
    const id = Number(params.id);
    const post = postMock[id];
    if (post) {
      return HttpResponse.json(post);
    } else {
      return HttpResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }
  }),

  http.post("/api/posts", async ({ request }) => {
    const newPost = await request.json() as Post;

    postMock.push(newPost); 
    return HttpResponse.json({ message: "게시글이 등록되었습니다." }, { status: 201 });
  }),
];
