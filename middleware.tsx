import { NextFetchEvent, NextRequest } from "next/server";
import { ApiMiddleware, AppMiddleware } from "@/lib/middleware";
import { parse } from "@/lib/middleware/utils";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /_next/ (Next.js internals)
     * 2. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!/|_next/|_proxy/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { key } = parse(req);

  if (key == "api") {
    return ApiMiddleware(req);
  }
  return AppMiddleware(req);
}
