import { createSwaggerSpec } from 'next-swagger-doc';
import userPaths from './modules/swagger-user';
import drivePaths from './modules/swagger-drive';
import parkingPaths from './modules/swagger-parking';
import adminPaths from './modules/swagger-admin';


const apiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Zapp API Documentation',
    version: '1.0.0',
    description: 'API Documentation for the Zapp application',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    ...userPaths,
    ...drivePaths,
    ...parkingPaths,
    ...adminPaths,
  },
};

export const getApiDocs = () => {
  return createSwaggerSpec({ definition: apiConfig });
};

export default apiConfig;