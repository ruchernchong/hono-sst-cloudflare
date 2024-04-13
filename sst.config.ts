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
    const hono = new sst.cloudflare.Worker("Api", {
      url: true,
      handler: "src/index.ts",
    });

    return {
      api: hono.url,
    };
  },
});
