const userPaths = {
  '/api/users/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', description: 'Username of the user', example: 'husu' },
                password: { type: 'string', format: 'password', description: 'Password of the user', example: '123456789' },
                phone_number: { type: 'string', description: 'Phone number of the user', example: '+3580464909851' },
                postnumber: { type: 'string', description: 'Postal code', example: '00550' },
                lastname: { type: 'string', description: 'Last name of the user', example: 'User' },
                data: {
                  type: 'string',
                  description: 'Additional user data in JSON format',
                  example: '{"email":"test@user.com","firstname":"Test"}',
                },
                license_front: {
                  type: 'string',
                  format: 'binary',
                  description: 'Image file for the front side of the license',
                },
                license_back: {
                  type: 'string',
                  format: 'binary',
                  description: 'Image file for the back side of the license',
                },
              },
              required: [
                'username',
                'password',
                'phone_number',
                'postnumber',
                'lastname',
                'data',
                'license_front',
                'license_back',
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'User created successfully' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      email: { type: 'string', example: 'test@user.com' },
                      firstname: { type: 'string', example: 'Test' },
                      lastname: { type: 'string', example: 'User' },
                      phone_number: { type: 'string', example: '+3580464909851' },
                      postnumber: { type: 'string', example: '00550' },
                      address: { type: 'string', example: 'Helsinki' },
                      is_validated: { type: 'boolean', example: false },
                      role: { type: 'string', example: 'user' },
                      created_at: { type: 'string', format: 'date-time', example: '2025-05-05T11:24:10.000Z' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/users/login': {
    post: {
      summary: 'Login User',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email_or_phone: { type: 'string', description: 'User email or phone number', example: 'test@user.com' },
                password: { type: 'string', format: 'password', description: 'User password', example: '123456789' },
              },
              required: ['email_or_phone', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Login successful' },
                  token: {
                    type: 'string',
                    description: 'JWT token for authenticated requests',
                    example: 'eyJhbGciOiJIUzI... (truncated)',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      email: { type: 'string', example: 'test@user.com' },
                      firstname: { type: 'string', example: 'Test' },
                      lastname: { type: 'string', example: 'User' },
                      phone_number: { type: 'string', example: '+3580464909851' },
                      postnumber: { type: 'string', example: '00550' },
                      address: { type: 'string', example: 'Helsinki' },
                      is_validated: { type: 'boolean', example: false },
                      role: { type: 'string', example: 'user' },
                      created_at: { type: 'string', format: 'date-time', example: '2025-05-05T11:24:10.000Z' },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Invalid email or password' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/users/{id}': {
    get: {
      summary: 'Get user by ID',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the user to retrieve',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'User retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  email: { type: 'string', example: 'test@user.com' },
                  firstname: { type: 'string', example: 'Test' },
                  lastname: { type: 'string', example: 'User' },
                },
              },
            },
          },
        },
        404: {
          description: 'User not found',
        },
      },
    },
    delete: {
      summary: 'Delete a user',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the user to delete',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        200: {
          description: 'User deleted successfully',
        },
        404: {
          description: 'User not found',
        },
      },
    },
    put: {
      summary: 'Update user information',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the user to update',
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', example: 'newemail@user.com' },
                firstname: { type: 'string', example: 'Updated Name' },
                lastname: { type: 'string', example: 'Updated Lastname' },
              },
              required: ['email', 'firstname', 'lastname'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
};

export default userPaths;