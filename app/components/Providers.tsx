"use client"
import { type ReactNode } from "react";
import NeynarProvider from "../providers/NeynarProvider";

export default function Providers({ children }: { children: ReactNode }){
    const neynarApiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
    const fckitApiUrl = process.env.NEXT_PUBLIC_API_URL;
    return(
        <NeynarProvider apiKey={neynarApiKey as string} fcKitApiUrl={fckitApiUrl as string}>
            {children}
        </NeynarProvider>
    )
}