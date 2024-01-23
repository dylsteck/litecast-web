import { useEffect, useState } from 'react';
import Link from 'next/link';
import CastFeed from './components/CastFeed';
import litecastIcon from '../public/icon.png';
import Image from 'next/image';
import SignInWithNeynar from './components/SignInWithNeynar';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto">
          {/* TODO: add nav content here */}
        </nav>
        <section className="col-span-1 md:col-span-6 overflow-y-scroll">
          <div className="p-3 border-b border-gray-400 pb-4">
            <p className="pl-2 font-medium text-black/75">Trending</p>
            {/* <p>All</p> */}
          </div>
          <CastFeed />
        </section>
        <div className="col-span-1 md:col-span-3 border-l border-gray-400 overflow-y-auto pl-3 pt-2 pb-2 md:pb-0">
          <Image src={litecastIcon} alt="Litecast icon" width={48} height={48} className="w-7 h-7 rounded-md" />
          <p className="pt-1 font-medium text-md text-black/80">Litecast</p>
          <p className="text-black/90">A beautiful yet simple Farcaster client</p>
          <Link href="https://github.com/dylsteck/litecast-web" className="visible md:hidden">
            <p className="text-sm text-black/75">GitHub</p>
          </Link>
          {/* <SignInWithNeynar /> */}
          {/* todo: re-implement SIWN and add mobile styling for the button */}
        </div>  
      </div>
    </main>
  );
}