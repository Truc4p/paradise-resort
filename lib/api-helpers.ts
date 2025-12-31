import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: any) {
  console.error('API Error:', error);

  // Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.issues.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.message,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'A record with this information already exists',
          details: error.meta,
        },
        { status: 409 }
      );
    }

    // Record not found
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    // Foreign key constraint violation
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid reference to related record' },
        { status: 400 }
      );
    }
  }

  // Generic error
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}

export function successResponse<T>(data: T, message?: string, statusCode = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}

export function errorResponse(message: string, statusCode = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      details,
    },
    { status: statusCode }
  );
}
