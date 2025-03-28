import { MiddlewareFunc } from "./middlewareRunner";
import { verifyToken } from "./verifyToken";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  // "/api/admin": [],
  "/api/users/login": [verifyToken],
  "/api/public": [],
};
export default middlewareConfig;
