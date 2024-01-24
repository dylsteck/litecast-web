/* eslint-disable @next/next/no-img-element */
"use client"
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import CastFeed from '../components/CastFeed';
import litecastIcon from '../public/icon.png';
import SignInWithNeynar from '../components/SignInWithNeynar';
import { useLogin } from '../providers/NeynarProvider';
import { BellIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CastIcon from '../components/CastIcon';

function PageLayoutLeft(){
    const alertComingSoon = (featureName: string) => {
        alert(`Support for ${featureName} is coming soon!`)
    }
    return(
        <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto relative md:flex justify-end items-start pr-0 pt-0 md:pr-2 md:pt-3">
          <div className="hidden md:flex md:flex-col md:gap-5">
            <Link href="/">
              <HomeIcon className="w-6 h-6" />
            </Link>
            <MagnifyingGlassIcon className="w-6 h-6" onClick={() => alertComingSoon('Search')} />
            <BellIcon className="w-6 h-6" onClick={() => alertComingSoon('Notifications')} />
            <CastIcon width={6} height={6} onClick={() => alertComingSoon('Cast Modal')} />
          </div>
        </nav>
    )
}

function PageLayoutCenter({ title, children }: { title: string, children: ReactNode}){
    return(
        <section className="col-span-1 md:col-span-6 overflow-y-scroll">
          <div className="pl-2 pt-1.5 pb-1.5 border-b border-gray-400 flex flex-row gap-4 items-center">
            <p className="pl-2 text-lg font-medium text-black/75">{title}</p>
          </div>
          {children}
        </section>
    )
}

function PageLayoutRight(){
    const { farcasterUser } = useLogin();
    return(
        <div className="col-span-1 md:col-span-3 border-l border-gray-400 overflow-y-auto pl-5 pt-2 pb-2 md:pb-0">
            <img src="https://i.imgur.com/enUb8gc.png" alt="Litecast icon" width={48} height={48} className="w-7 h-7 rounded-md" />
            <p className="pt-1 font-medium text-md text-black/80">Litecast</p>
            <p className="text-black/90 text-sm max-w-[80%]">A beautiful yet simple Farcaster client</p>
            {!farcasterUser && <SignInWithNeynar />}
      </div>  
    )
}

export default function PageLayout({ title, children }: { title: string, children: ReactNode}) {
  return (
    <main className="h-screen w-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <PageLayoutLeft />
        <PageLayoutCenter title={title}>
            {children}
        </PageLayoutCenter>
        <PageLayoutRight />
      </div>
    </main>
  );
}