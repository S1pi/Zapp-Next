import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../auth";

// export async function verifyToken(
//   req: NextRequest
// ): Promise<NextResponse | null> {
//   // console.log("Verifying token", req.nextUrl.pathname);
//   const authToken = req.headers.get("Authorization")?.split(" ")[1];

//   console.log("Checking auth token", authToken);
//   if (!authToken) {
//     return NextResponse.json(
//       { error: "Authorization token is required" },
//       { status: 401 }
//     );
//   }

//   if (!process.env.JWT_SECRET) {
//     return NextResponse.json(
//       { error: "JWT_SECRET is not defined" },
//       { status: 500 }
//     );
//   }

//   try {
//     const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

//     const { payload } = await jwtVerify(authToken, jwtSecret);

//     console.log("Decoded payload", payload);

//     const { id, role } = payload as TokenData;

//     if (!id || !role) {
//       return NextResponse.json(
//         { error: "Token is not valid or missing fields" },
//         { status: 403 }
//       );
//     }

//     // Old version of forwarding user data to the next middleware or route handler
//     // Problem with this approach is that it puts the headers in the response instead of the request
//     // const res = NextResponse.next();
//     // res.headers.set("X-User-Id", String(id));
//     // res.headers.set("X-User-Role", role);
//     // return res;

//     // New version of adding headers
//     // This approach is better because it forwards the headers as part of the request to the next middleware or route handler
//     // and not as part of the response. This way, the next middleware or route handler can access the headers directly from the request object.

//     const newHeaders = new Headers(req.headers);
//     newHeaders.set("X-User-Id", String(id));
//     newHeaders.set("X-User-Role", role);

//     return NextResponse.next({
//       request: {
//         headers: newHeaders,
//       },
//     });
//   } catch (err) {
//     console.error("Error decoding token", err);

//     return NextResponse.json(
//       { error: "Forbidden - invalid token" },
//       { status: 403 }
//     );
//   }
// }

export async function verifyApi(
  req: NextRequest
): Promise<NextResponse | null> {
  const authToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!authToken) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 }
    );
  }

  try {
    const { id, role, validated } = await verifyToken(authToken);

    // if (!id || !role) {
    //   return NextResponse.json(
    //     { error: "Token is not valid or missing fields" },
    //     { status: 403 }
    //   );
    // }

    const newHeaders = new Headers(req.headers);
    newHeaders.set("X-User-Id", String(id));
    newHeaders.set("X-User-Role", role);
    newHeaders.set("X-User-Validated", String(validated));

    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  } catch (err) {
    console.error("Error decoding token", err);

    return NextResponse.json(
      { error: "Forbidden - invalid token" },
      { status: 403 }
    );
  }
}
