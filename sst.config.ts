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
    const bucket = new sst.cloudflare.Bucket("HonoSSTBucket");
    const hono = new sst.cloudflare.Worker("HonoSSTAPI", {
      url: true,
      link: [bucket],
      handler: "src/index.ts",
    });

    return {
      api: hono.url,
    };
  },
});
