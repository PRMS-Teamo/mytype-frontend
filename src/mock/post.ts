import { http, HttpResponse } from "msw";
import type { Post } from "../model/Post";

export const postMock: Post[] = [];

export const postHandlers = [
  http.get("/api/posts", () => {
    return HttpResponse.json(postMock);
  }),

  http.get("/api/posts/:id", ({ params }) => {
    const id = params.id;
    const post = postMock.find((p) => p.id === id);
    if (post) {
      return HttpResponse.json(post);
    } else {
      return HttpResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }
  }),

  http.post("/api/posts", async ({ request }) => {
    const newPost = await request.json() as Post;

    const existingPost = postMock.find((post) => post.userId === newPost.userId);
    if (existingPost) {
      return HttpResponse.json({ message: "이미 작성한 게시글이 있습니다." }, { status: 400 });
    }

    const id = Date.now().toString();
    const createdPost = { ...newPost, id };

    postMock.push(createdPost);
    return HttpResponse.json(createdPost, { status: 201 });
  }),

  http.patch("/api/posts/:id", async ({ request, params }) => {
    const updatedPost = await request.json() as Post;
    const id = params.id;
    const index = postMock.findIndex((post) => post.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (postMock[index].userId !== updatedPost.userId) {
      return HttpResponse.json({ message: "수정 권한이 없습니다." }, { status: 403 });
    }

    postMock[index] = { ...updatedPost, id: postMock[index].id };
    return HttpResponse.json(postMock[index], { status: 200 });
  })
];