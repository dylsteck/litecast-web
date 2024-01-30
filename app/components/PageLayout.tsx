/* eslint-disable @next/next/no-img-element */
"use client"
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import CastFeed from '../components/CastFeed';
import litecastIcon from '../public/icon.png';
import SignInWithNeynar from '../components/SignInWithNeynar';
import { useLogin } from '../providers/NeynarProvider';
import { BellIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Category } from '../search/page';

function PageLayoutLeft(){
    const { farcasterUser } = useLogin();
    const alertComingSoon = (featureName: string) => {
        alert(`Support for ${featureName} is coming soon!`)
    }
    return(
        <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto relative md:flex justify-end items-start pr-0 pt-0 md:pr-2 md:pt-3">
          <div className="hidden md:flex md:flex-col md:gap-5">
            <Link href="/">
              <HomeIcon className="w-6 h-6 text-[#616161]" />
            </Link>
            <Link href="/search">
              <MagnifyingGlassIcon className="w-6 h-6 text-[#616161]" />
            </Link>
            {/* Frame Icon */}
            {/* <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.58579" y="2.97214" width="17.1324" height="17.1324" rx="2.45291" stroke="#616161" stroke-width="2.33955"/>
              <path d="M0.850098 1.23633L7.30301 7.68924" stroke="white" stroke-width="2.37739"/>
              <path d="M0.850098 21.9536L7.30301 15.5007" stroke="white" stroke-width="2.37739"/>
              <path d="M21.8501 1.23633L15.3972 7.68924" stroke="white" stroke-width="2.37739"/>
              <path d="M21.8501 21.9536L15.3972 15.5007" stroke="white" stroke-width="2.37739"/>
              </svg> */}
            <BellIcon className="w-6 h-6 text-[#616161]" onClick={() => alertComingSoon('Notifications')} />
            <Link href={`/${farcasterUser?.fname}`}>
              <img src={farcasterUser?.pfp} alt={`PFP for @${farcasterUser?.fname}`} width={6} height={6} className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </nav>
    )
}

function PageLayoutCenter({ title, children, isSearch = false, handleSearch }: { title: string, children: ReactNode, isSearch?: boolean, handleSearch?: (value: string, category: string) => void }) {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Casts');

  return (
      <section className="col-span-1 md:col-span-6 overflow-y-scroll">
        <div className="pl-2 pt-1.5 pb-1.5 border-b border-gray-400 flex flex-row gap-4 items-center">
          {isSearch && handleSearch ? (
              <div className="flex flex-row gap-2 items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category)}
                  className="text-lg text-black/80 outline-none"
                >
                  <option value="Casts">Casts</option>
                  <option value="Channels" disabled>Channels</option>
                  <option value="Users" disabled>Users</option>
                </select>
                <input
                  type="text"
                  value={query}
                  placeholder="Search anything..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="text-lg text-black/80 placeholder-black/80 outline-none"
                />
                <button
                  className="px-2.5 py-0.75 rounded-md text-black/85 items-center text-sm font-medium border border-black/60"
                  onClick={() => handleSearch(query, selectedCategory)}
                >
                  Submit
                </button>
              </div>
          ) : (
              <p className="pl-2 text-lg font-medium text-black/75">{title}</p>
          )}
        </div>
        {children}
      </section>
  );
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

export default function PageLayout({ title, children, isSearch = false, handleSearch }: { title: string, children: ReactNode, isSearch?: boolean, handleSearch?: (value: string, category: string) => void }) {
  return (
    <main className="h-screen w-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <PageLayoutLeft />
        <PageLayoutCenter title={title} isSearch={isSearch} handleSearch={handleSearch}>
            {children}
        </PageLayoutCenter>
        <PageLayoutRight />
      </div>
    </main>
  );
}