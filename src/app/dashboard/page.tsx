"use client";
import { signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import toast from 'react-hot-toast';

function DashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'already-logged-in') {
      toast.success('Você já está logado!');

      const url = new URL(window.location.href);
      url.searchParams.delete('message');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando...</p>
        </div>
      </main>
    );
  }

  const userName = session?.user?.name || session?.user?.email || 'Usuário';

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Acesso autorizado, {userName}!
        </h1>
        <p className="text-gray-600 mb-6">
          Você está logado e pode acessar todas as funcionalidades.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando...</p>
        </div>
      </main>
    }>
      <DashboardContent />
    </Suspense>
  );
} 