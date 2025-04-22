import { MiddlewareFunc } from "./middlewareRunner";
import { verifyAdmin } from "./verifyAdmin";
import { verifyApi } from "./verifyApi";

type MiddlewareMap = Record<string, MiddlewareFunc[]>;

const middlewareConfig: MiddlewareMap = {
  // Api routes for ReactNative
  "/api/public": [],
  "/api/users/getbytoken": [verifyApi],
  "/api/dealership": [verifyApi],
  "/api/cars": [verifyApi],
  "/api/users/modify": [verifyApi],
  "/api/securefiles": [verifyApi],
  "/api/parking-zones/add": [verifyApi],
  // Next.js Routes
  "/dashboard": [verifyAdmin],
};
export default middlewareConfig;
