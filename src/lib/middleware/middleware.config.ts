import { MiddlewareFunc } from "./middlewareRunner";
import { verifyDealership } from "./verifyDealership";
import { verifyToken } from "./verifyToken";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  "/api/public": [],
  "/api/users/getbytoken": [verifyToken],
  "/api/dealership": [verifyToken],
  "/api/cars": [verifyToken],
};
export default middlewareConfig;
