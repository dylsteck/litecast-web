/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CastFeed from './components/CastFeed';
import litecastIcon from '../public/icon.png';
import SignInWithNeynar from './components/SignInWithNeynar';
import { useLogin } from './providers/NeynarProvider';

export default function Home() {
  const { farcasterUser } = useLogin();
  return (
    <main className="h-screen w-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto">
          {/* TODO: add nav content here */}
        </nav>
        <section className="col-span-1 md:col-span-6 overflow-y-scroll">
          <div className="p-3 border-b border-gray-400 pb-4 flex flex-row gap-4 items-center">
            <p className="pl-2 text-lg font-medium text-black/75">Home</p>
          </div>
          <CastFeed />
        </section>
        <div className="col-span-1 md:col-span-3 border-l border-gray-400 overflow-y-auto pl-5 pt-2 pb-2 md:pb-0">
          <img src="https://i.imgur.com/enUb8gc.png" alt="Litecast icon" width={48} height={48} className="w-7 h-7 rounded-md" />
          <p className="pt-1 font-medium text-md text-black/80">Litecast</p>
          <p className="text-black/90 text-sm max-w-[80%]">A beautiful yet simple Farcaster client</p>
          {!farcasterUser && <SignInWithNeynar />}
        </div>  
      </div>
    </main>
  );
}