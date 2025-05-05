const parkingPaths = {
    '/api/parking-zones': {
      get: {
        summary: 'Get list of parking zones',
        tags: ['Parking Zones'],
        responses: {
          200: {
            description: 'List of parking zones',
          },
        },
      },
    },
  };
  
  export default parkingPaths;