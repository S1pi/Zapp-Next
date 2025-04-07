import { MiddlewareFunc } from "./middlewareRunner";
import { verifyToken } from "./verifyToken";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  // "/api/admin": [],
  "/api/users/getbytoken": [verifyToken],
  "/api/public": [],
};
export default middlewareConfig;
