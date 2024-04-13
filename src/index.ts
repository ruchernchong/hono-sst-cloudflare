import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  c.header("Content-Type", "application/json");
  c.header("Cache-Control", "public,max-age=86400");

  return c.body(JSON.stringify(response));
});

app.get("/posts/:id", async (c) => {
  const id = c.req.param("id");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  )
    .then((res) => res)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  c.header("Content-Type", "application/json");
  c.header("Cache-Control", "public,max-age=86400");

  return c.body(JSON.stringify(response));
});

export default app;
