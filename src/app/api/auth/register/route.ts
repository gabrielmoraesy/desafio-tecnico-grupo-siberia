import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validação básica inline
    if (!data.email || !data.password || !data.name) {
      return NextResponse.json({ message: 'Nome, email e senha são obrigatórios' }, { status: 400 });
    }
    if (data.password.length < 8) {
      return NextResponse.json({ message: 'A senha deve ter pelo menos 8 caracteres' }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      return NextResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
    }
    const hashed = await hash(data.password, 10);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        provider: 'credentials',
      },
    });
    return NextResponse.json({ message: 'Usuário cadastrado com sucesso' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'Erro no cadastro' }, { status: 500 });
  }
} 