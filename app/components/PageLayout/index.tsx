/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import PageLayoutLeft from './PageLayoutLeft';
import PageLayoutCenter from './PageLayoutCenter';
import PageLayoutRight from './PageLayoutRight';

interface PageLayoutProps{
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="h-screen w-screen bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <PageLayoutLeft />
        <PageLayoutCenter>
            {children}
        </PageLayoutCenter>
        <PageLayoutRight />
      </div>
    </main>
  );
}