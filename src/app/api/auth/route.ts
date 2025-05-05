import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Authenticate user and receive access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     lastLogin:
 *                       type: string
 *                       format: date-time
 */
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Your authentication logic here
    return NextResponse.json({
      token: "generated-jwt-token",
      user: {
        id: "user-uuid",
        email,
        name: "User Name",
        role: "user",
        lastLogin: "2025-05-05 16:30:37"
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
            details: error.errors
          }
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: {
          code: "AUTH_ERROR",
          message: "Authentication failed"
        }
      },
      { status: 401 }
    );
  }
}