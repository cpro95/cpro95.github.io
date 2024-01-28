import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

#DaumWebMasterTool:28388e61878414e7ad0fba19ee4a23a13ade5d71e2589d54fe45f9ee847c459e:AMTsw6vTdZJxdXeFCU8NDQ==

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
