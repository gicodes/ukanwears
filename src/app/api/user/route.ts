import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import getPool from '@/lib/sequelize';
import { NextResponse } from 'next/server';
import User from '../../../models/User.model';

const { JWT_SECRET } = process.env;

export async function GET(request: Request) {
  try {
    await getPool();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: number };
    
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      user_profile: user.orders, 
      createdAt: user.createdAt,      
      updatedAt: user.updatedAt,
      
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
