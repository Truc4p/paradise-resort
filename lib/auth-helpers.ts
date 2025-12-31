import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextRequest } from 'next/server';
import { errorResponse } from './api-helpers';

export async function requireAuth(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session.user;
}

export async function requireAdmin(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  if (session.user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }

  return session.user;
}

export function isAdmin(user: { role: string } | null | undefined): boolean {
  return user?.role === 'ADMIN';
}

export async function getOptionalAuth(request: NextRequest) {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export function validateRequiredFields(data: any, fields: string[]) {
  const missing = fields.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}
