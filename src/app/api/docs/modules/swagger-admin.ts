const adminPaths = {
    '/api/admin/dashboard': {
      get: {
        summary: 'Admin dashboard',
        tags: ['Admin'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Admin dashboard data',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
  };
  
  export default adminPaths;