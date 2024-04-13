import { Hono } from "hono";
import { Resource } from "sst";

const app = new Hono();

app.get("/", async (c) => {
  const first = await Resource.HonoSSTBucket.list().then(
    (res) =>
      res.objects.sort(
        (a, b) => a.uploaded.getTime() - b.uploaded.getTime(),
      )[0],
  );
  const result = await Resource.HonoSSTBucket.get(first.key);
  c.header("content-type", result.httpMetadata.contentType);
  return c.body(result.body);
});

app.put("/*", async (c) => {
  const key = crypto.randomUUID();
  await Resource.HonoSSTBucket.put(key, c.req.raw.body, {
    httpMetadata: {
      contentType: c.req.header("content-type"),
    },
  });
  return new Response(`Object created with key: ${key}`);
});

app.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi!");
  return c.text(`You want see ${page} of ${id}`);
});

app.post("/posts", (c) => c.text("Created!", 201));

app.put("/posts/:id", async (c) => {
  const key = crypto.randomUUID();
  await Resource.HonoSSTBucket.put(key, c.req.raw.body, {
    httpMetadata: {
      contentType: c.req.header("content-type"),
    },
  });
  return new Response(`Object created with key: ${key}`);
});

app.delete("/posts/:id", (c) => c.text(`${c.req.param("id")} is deleted!`));

export default app;
