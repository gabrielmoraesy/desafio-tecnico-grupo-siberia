import { prisma } from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Testa conexão com o banco
    await prisma.$connect();
    
    // Verifica se as tabelas existem
    const users = await prisma.user.findMany({ take: 1 });
    
    return NextResponse.json({ 
      message: 'Database connected successfully!',
      tablesExist: true,
      userCount: users.length 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
