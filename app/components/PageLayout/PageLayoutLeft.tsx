/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import litecastIcon from '../public/icon.png';
import { useLogin } from '../../providers/NeynarProvider';
import { BellIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GHOST_USER_PFP_URL } from '@/app/utils/consts';

export default function PageLayoutLeft(){
    const { farcasterUser } = useLogin();
    return(
        <nav className="col-span-1 md:col-span-3 border-r border-gray-400 overflow-y-auto relative md:flex justify-end items-start pr-0 pt-0 md:pr-2 md:pt-3">
          <div className="hidden md:flex md:flex-col md:gap-5">
            <Link href="/">
              <HomeIcon className="w-6 h-6 text-[#616161]" />
            </Link>
            {/* <Link href="/search">
              <MagnifyingGlassIcon className="w-6 h-6 text-[#616161]" />
            </Link> */}
            {/* Frame Icon from @[find user's fname] */}
            {/* <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.58579" y="2.97214" width="17.1324" height="17.1324" rx="2.45291" stroke="#616161" stroke-width="2.33955"/>
              <path d="M0.850098 1.23633L7.30301 7.68924" stroke="white" stroke-width="2.37739"/>
              <path d="M0.850098 21.9536L7.30301 15.5007" stroke="white" stroke-width="2.37739"/>
              <path d="M21.8501 1.23633L15.3972 7.68924" stroke="white" stroke-width="2.37739"/>
              <path d="M21.8501 21.9536L15.3972 15.5007" stroke="white" stroke-width="2.37739"/>
              </svg> */}
            <Link href="/notifications">
              <BellIcon className="w-6 h-6 text-[#616161]" />
            </Link>
            <Link href={`/${farcasterUser?.fname}`}>
              <img src={farcasterUser?.pfp ?? GHOST_USER_PFP_URL} alt={`PFP for @${farcasterUser?.fname}`} width={6} height={6} className="w-6 h-6 object-contain" />
            </Link>
          </div>
        </nav>
    )
}