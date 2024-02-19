import { useState, useEffect } from 'react';
import { type NeynarCastV1 } from '../types';
import useSWRInfinite from 'swr/infinite';

interface NeynarCastsByUserResponse {
  result: {
    casts: NeynarCastV1[];
    next?: {
      cursor: string;
    };
  };
}

export default function useNeynarCastsByUser(userFid: number, viewerFid: number) {
  const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
  if (!apiKey) throw new Error("No Neynar API key found in environment variables");

  const getKey = (pageIndex: number, previousPageData: NeynarCastsByUserResponse | null) => {
    if (previousPageData && !previousPageData.result.next) return null;
    return `https://api.neynar.com/v1/farcaster/casts?fid=${userFid}&viewerFid=${viewerFid}&limit=25&cursor=${previousPageData?.result?.next?.cursor || ''}`;
  };

  const fetcher = (url: string) => fetch(url, {
    headers: {
      'Accept': 'application/json',
      'api_key': apiKey,
    },
  }).then(res => res.json());

  const { data, size, setSize, error } = useSWRInfinite<NeynarCastsByUserResponse>(getKey, fetcher);

  const casts = data ? data.flatMap(page => page.result.casts) : [];
  const isLoading = !data && !error;
  const isReachingEnd = data && !data[data.length - 1]?.result.next;

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  return { casts, isLoading, isReachingEnd, loadMore };
};