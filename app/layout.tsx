import type { Metadata } from "next";
import "./globals.css";
import NeynarProvider from "./providers/NeynarProvider";
import React, { type ReactNode } from "react";
import Script from "next/script";
import Providers from "./components/Providers";
import { GeistSans } from "geist/font/sans";

const PAGE = {
  title: "Litecast",
  description: "A beautiful yet simple Farcaster client",
};

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.description,
  openGraph: {
    title: PAGE.title,
    description: PAGE.description,
    url: 'https://litecast.xyz',
    siteName: PAGE.title,
    images: [
      {
        url: 'https://i.imgur.com/QO9ar9u.png',
        width: 1200,
        height: 634,
        alt: 'og:image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: 'https://i.imgur.com/enUb8gc.png'
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE.title,
    description: PAGE.description,
    creator: '@Dylan_Steck',
    images: ['https://i.imgur.com/QO9ar9u.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
      <Script src="https://neynarxyz.github.io/siwn/raw/1.0.0/index.js" async />
    </html>
  );
}
