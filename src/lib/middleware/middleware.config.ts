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
  "/api/parking-zones/add": [verifyApi],
  "/api/drive": [verifyApi],
  // Next.js Routes
  "/dashboard": [verifyAdmin],
  "/api/securefiles": [verifyAdmin],
};
export default middlewareConfig;
