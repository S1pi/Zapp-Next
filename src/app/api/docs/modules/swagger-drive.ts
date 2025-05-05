const drivePaths = {
    '/api/drive/start': {
      post: {
        summary: 'Start a drive session',
        tags: ['Drive'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user_id: { type: 'integer' },
                  car_id: { type: 'integer' },
                  start_location: { type: 'string' },
                },
                required: ['user_id', 'car_id', 'start_location'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Drive session started',
          },
        },
      },
    },
    '/api/drive/end': {
      post: {
        summary: 'End a drive session',
        tags: ['Drive'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  drive_id: { type: 'integer' },
                  end_location: { type: 'string' },
                  total_time: { type: 'integer' },
                },
                required: ['drive_id', 'end_location', 'total_time'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Drive session ended',
          },
        },
      },
    },
  };
  
  export default drivePaths;