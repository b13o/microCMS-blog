import { BlogListResponse } from "@/lib/microcms/types";
import { http, HttpResponse } from "msw";
import { mockPosts } from "./data";

export const handlers = [
  http.get("*/blog", () => {
    const response: BlogListResponse = {
      contents: mockPosts,
      totalCount: mockPosts.length,
      offset: 0,
      limit: 6,
    };
    return HttpResponse.json(response);
  }),

  http.get("*/blog/:id", ({ params }) => {
    const { id } = params;
    const post = mockPosts.find((post) => post.id === id);

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),
];
