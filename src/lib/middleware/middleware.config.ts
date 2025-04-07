import { verify } from "crypto";
import { MiddlewareFunc } from "./middlewareRunner";
import { verifyToken } from "./verifyToken";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  // "/api/admin": [],
  "/api/users/getbytoken": [verifyToken],
  "/api/public": [],
  "/api/dealership/create": [verifyToken],
  "/api/dealership/byid/": [verifyToken],
};
export default middlewareConfig;
