/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "hono-sst-cloudflare",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },
  async run() {
    const hono = new sst.cloudflare.Worker("Hono", {
      handler: "src/index.ts",
      url: true,
    });

    return {
      api: hono.url,
    };
  },
});
