import { NextRequest } from "next/server";
import middlewareConfig from "./lib/middleware/middleware.config";
import { middlewareRunner } from "./lib/middleware/middlewareRunner";

function getMiddlewares(pathname: string) {
  for (const path in middlewareConfig) {
    if (pathname.startsWith(path)) {
      return middlewareConfig[path];
    }
  }
  return [];
}

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered", req.nextUrl.pathname);
  const chain = getMiddlewares(req.nextUrl.pathname);
  return middlewareRunner(req, chain);
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
