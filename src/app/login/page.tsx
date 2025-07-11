import Image from 'next/image';

import backgroundLogin from '../../assets/background-login.png';
import logo from '../../assets/logo.png';
import TabsAuth from '../../components/TabsAuth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Conteúdo de autenticação - LADO ESQUERDO */}
      <div className="flex-1 flex flex-col justify-between bg-white/80 md:bg-white order-2 md:order-1">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md flex flex-col items-start">
            {/* Logo alinhada à esquerda acima dos tabs */}
            <Image src={logo} alt="tamo junto" width={160} height={40} priority className="mb-8" />
            <TabsAuth />
          </div>
        </div>
      </div>
      {/* Banner ilustrativo - LADO DIREITO */}
      <div className="hidden md:flex w-1/2 items-center justify-center order-1 md:order-2 bg-[#f6f7fb] relative">
        <Image
          src={backgroundLogin}
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
        <div className="relative z-10 p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            A Revolução do<br />Marketing por <span className="text-[#2ad2c9]">Influência</span>
          </h2>
        </div>
      </div>
      {/* Banner como fundo no mobile */}
      <div className="absolute inset-0 md:hidden -z-10">
        <Image
          src={backgroundLogin}
          alt="Banner" fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
} 