import { schema } from "./schema";
import { createClient } from "./client";

const api = createClient(schema, { baseUrl: "https://api.example.com" });

api.blog.POST({
    payload:{
        title: "t",
        content: "c",
    }
})
// `authorization` is inherited from admin._HEADER; `query` is optional
await api.admin.blog[":id"].POST({
  header: { authorization: "Bearer xyz" },
  param: { id: "42" },
  payload: { message: "hello" },
});

// with query
await api.admin.blog[":id"].POST({
  header: { authorization: "Bearer xyz" },
  param: { id: "42" },
  query: { limit: 10 },
  payload: { message: "hello" },
});

await api.admin.user.GET({ header: { authorization: "Bearer xyz" } });

// no header declared on this branch, nothing required
await api.test.POST();
await api.blog.POST({ payload: { title: "t", content: "c" } });

// @ts-expect-error  header is required under `admin`
await api.admin.user.GET();