import { MiddlewareFunc } from "./middlewareRunner";
import { verifyToken } from "./verifyToken";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  "/api/public": [],
  "/api/users/getbytoken": [verifyToken],
  "/api/dealership": [verifyToken],
  "/api/cars": [verifyToken],
  "/api/users/modify": [verifyToken],
};
export default middlewareConfig;
