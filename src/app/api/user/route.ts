import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../../../models/User.model';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}