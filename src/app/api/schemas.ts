export const schemas = {
    UserLogin: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
      required: ['email', 'password'],
    },
    UserToken: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
    UserProfile: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
      },
    },
  };
  
  export default schemas;