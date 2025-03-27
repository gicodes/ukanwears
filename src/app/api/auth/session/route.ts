import dotenv from "dotenv"
dotenv.config();

import jwt from 'jsonwebtoken';
import User from '../../../../models/User.model';
import { NextRequest, NextResponse } from 'next/server';
import getPool from "@/lib/sequelize";

const { JWT_SECRET } = process.env;

export async function GET(request: NextRequest) {
  await getPool();

  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: string };
    
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json({ user: null });
  }
}
