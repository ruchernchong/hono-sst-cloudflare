import { Hono } from "hono";
import { cache } from "hono/cache";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";

const app = new Hono();

app.use(logger());
app.use(secureHeaders());
app.use(timing());

app.get(
  "*",
  cache({
    cacheName: "hono-sst-cloudflare",
    cacheControl: "public, max-age=86400",
  }),
);

app.get("/", async (c) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return c.json(response);
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  )
    .then((res) => res)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return c.json(response);
});

export default app;
