export const authSchemas = {
    LoginRequest: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          format: 'password'
        }
      }
    },
    TokenResponse: {
      type: 'object',
      properties: {
        token: {
          type: 'string'
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            role: {
              type: 'string'
            },
            is_validated: {
              type: 'boolean'
            }
          }
        }
      }
    }
  };
  
  export default authSchemas;