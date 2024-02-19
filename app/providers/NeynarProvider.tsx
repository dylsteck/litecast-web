import React, { createContext, useState, useContext, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { LOCAL_STORAGE_FARCASTER_USER } from '../utils/consts';

export interface FarcasterUser {
  signer_uuid: string;
  fid: number;
  fname: string;
  displayName: string;
  profile: {
    bio?: string;
  };
  pfp: string;
  followerCount: number;
  followingCount: number;
}

export interface Cast {
  hash: string;
  author: {
    username: string;
    pfp_url: string;
    display_name: string;
  };
  text: string;
  timestamp: string;
  reactions: {
    likes: Array<{ fid: number, fname: string }>;
    recasts: Array<{ fid: number, fname: string }>;
  };
  replies: { count: number };
}

export interface NeynarContextProps {
  farcasterUser: FarcasterUser | null;
  setFarcasterUser: React.Dispatch<React.SetStateAction<FarcasterUser | null>>;
  postCast: (respBody: any) => Promise<void>;
  postReaction: (type: 'like' | 'recast', hash: string) => Promise<void>;
  apiKey: string;
  API_URL: string;
}

export const NeynarContext = createContext<NeynarContextProps | undefined>(undefined);

export const NeynarProvider: React.FC<{ children: React.ReactNode, apiKey: string, fcKitApiUrl?: string }> = ({ children, apiKey, fcKitApiUrl }) => {
  if (!apiKey) {
    throw new Error("API key is required for NeynarProvider");
  }
  const API_KEY = apiKey;
  const API_URL = fcKitApiUrl ? fcKitApiUrl : 'https://api.farcasterkit.com';
  const [farcasterUser, setFarcasterUser] = useState<FarcasterUser | null>(null);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_FARCASTER_USER);
      if (storedData) {
        const user: FarcasterUser = JSON.parse(storedData);
        setFarcasterUser(user);
      }
    };
    fetchData();
  }, []);

  const postCast = async (respBody: any) => {
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/cast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY,
        },
        body: JSON.stringify(respBody),
      });
      const castPostResponse = await response.json();
      if(castPostResponse.message){
        throw new Error(`Error posting a cast: ${castPostResponse.message}`)
      }
    } catch (error) {
      console.error('Failed to post cast', error);
    }
  };

  const postReaction = async (type: 'like' | 'recast', hash: string) => {
    try {
      await fetch('https://api.neynar.com/v2/farcaster/reaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_key': API_KEY,
        },
        body: JSON.stringify({
          signer_uuid: farcasterUser?.signer_uuid,
          reaction_type: type,
          target: hash,
        }),
      });
    } catch (error) {
      console.error('Failed to post reaction', error);
    }
  };

  return (
    <NeynarContext.Provider value={{ farcasterUser, setFarcasterUser, postCast, postReaction, apiKey, API_URL }}>
      {children}
    </NeynarContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw new Error('useLogin must be used within a NeynarProvider');
  }
  return context;
};

export const useReaction = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw Error('useReaction must be used within a NeynarProvider');
  }
  return context.postReaction;
};

export const usePostCast = () => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw Error('usePostCast must be used within a NeynarProvider');
  }
  return context.postCast;
};

export const useLatestCasts = (type = 'home', parentUrl = '') => {
  const context = useContext(NeynarContext);
  if (!context) {
    throw new Error('NeynarContext is required but was not found');
  }
  const { apiKey, API_URL } = context;
  if (!apiKey) {
    throw new Error('API key is missing in NeynarContext');
  }

  const getKey = (pageIndex: number, previousPageData: { next?: { cursor: string } } | null) => {
    const homeCastsUrl = `https://api.neynar.com/v2/farcaster/feed?feed_type=following&fid=${context.farcasterUser?.fid ?? 616}&limit=25&cursor=${previousPageData?.next?.cursor || ''}`
    const trendingCastsUrl = parentUrl.length > 0 ? `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=parent_url&fid=${context.farcasterUser?.fid ?? 616}&parent_url=${parentUrl}&with_recasts=true&limit=25&cursor=${previousPageData?.next?.cursor || ''}` : `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=global_trending&fid=${context.farcasterUser?.fid ?? 616}&with_recasts=true&limit=25&cursor=${previousPageData?.next?.cursor || ''}`;
    if (previousPageData && !previousPageData.next) return null;
      return type === 'home' && parentUrl.length === 0 ? homeCastsUrl : trendingCastsUrl;
  };

  const fetcher = (url: string) => fetch(url, {
    headers: {
      'Accept': 'application/json',
      'api_key': apiKey,
    },
  }).then(res => res.json());

  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher);

  const casts = data ? data.flatMap(page => page.casts) : [];
  const isLoading = !data && !error;
  const isReachingEnd = data ? data[data.length - 1]?.next?.cursor == null : false;

  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  return { casts, isLoading, isReachingEnd, loadMore };
};

export default NeynarProvider;