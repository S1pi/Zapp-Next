import { NextRequest, NextResponse } from "next/server";

export type MiddlewareFunc = (req: NextRequest) => Promise<NextResponse | null>;

async function middlewareRunner(
  req: NextRequest,
  middlewareChain: MiddlewareFunc[]
): Promise<NextResponse> {
  console.log("Running middleware chain", middlewareChain.length);

  for (const midWare of middlewareChain) {
    const res = await midWare(req);
    if (res) {
      return res;
    }
  }
  return NextResponse.next();
}

export { middlewareRunner };
