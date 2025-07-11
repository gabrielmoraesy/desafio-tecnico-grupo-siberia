import Image from 'next/image';
import { Suspense } from 'react';

import backgroundLogin from '../../assets/background-login.png';
import logo from '../../assets/logo.png';
import TabsAuth from '../../components/TabsAuth';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="absolute inset-0 md:hidden">
        <Image
          src={backgroundLogin}
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center md:justify-between bg-transparent md:bg-white order-2 md:order-1 relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:px-4">
          <div className="w-full max-w-sm md:max-w-md bg-white md:bg-transparent rounded-lg md:rounded-none p-5 py-8 md:p-0 shadow-2xl md:shadow-none">
            <div className="flex justify-center md:justify-start mb-6 md:mb-8">
              <Image src={logo} alt="tamo junto" width={190} height={39} priority />
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <TabsAuth />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center order-1 md:order-2 bg-[#f6f7fb] relative">
        <Image
          src={backgroundLogin}
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
        <div className="relative z-10 p-12">
          <h2 className="text-3xl md:text-[42px] lg:text-[50px] font-bold text-dark mb-2 leading-tight">
            A Revolução do<br />Marketing por<br /><span className="text-[#4FD8CD]">Influência</span>
          </h2>
        </div>
      </div>
    </div>
  );
} 