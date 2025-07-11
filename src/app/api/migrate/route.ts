import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    // Executa as migrações
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    
    return NextResponse.json({ 
      message: 'Migrations executed successfully!',
      stdout,
      stderr 
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
