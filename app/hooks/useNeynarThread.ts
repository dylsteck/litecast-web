import { useState, useEffect } from 'react';

export type NeynarCastV1 =  {
  hash: string;
  parentHash: string | null;
  parentUrl: string | null;
  rootParentUrl: string | null;
  threadHash: string;
  parentAuthor: {
      fid: number | null;
      custodyAddress: string;
      username: string;
      displayName: string;
      pfp: {
          url: string;
      };
      profile: {
          bio: {
              text: string;
              mentionedProfiles: any[];
          };
      };
      followerCount: number;
      followingCount: number;
      verifications: string[];
      activeStatus: string;
  } | null;
  author: {
      fid: number;
      custodyAddress: string;
      username: string;
      displayName: string;
      pfp: {
          url: string;
      };
      profile: {
          bio: {
              text: string;
              mentionedProfiles: any[];
          };
      };
      followerCount: number;
      followingCount: number;
      verifications: string[];
      activeStatus: string;
  };
  text: string;
  timestamp: string;
  embeds: Array<{
      url: string;
  }>;
  mentionedProfiles: Array<{
      fid: number;
      custodyAddress: string;
      username: string;
      displayName: string;
      pfp: {
          url: string;
      };
      profile: {
          bio: {
              text: string;
              mentionedProfiles: any[];
          };
      };
      followerCount: number;
      followingCount: number;
      verifications: string[];
      activeStatus: string;
  }>;
  reactions: {
      count: number;
      fids: number[];
      fnames: string[];
  };
  recasts: {
      count: number;
      fids: number[];
  };
  recasters: string[];
  viewerContext: {
      liked: boolean;
      recasted: boolean;
  };
  replies: {
      count: number;
  };
}

type NeynarCastThreadV1Response =  {
  result: {
      casts: Array<NeynarCastV1>;
  };
}

function useNeynarThread(threadHash: string, userFid: number) {
  // Update the state to hold an array of NeynarCastV1 objects
  const [data, setData] = useState<NeynarCastV1[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  if (threadHash.length === 0 || userFid === 0) {
    throw new Error('You must pass a valid threadHash and userFid to useNeynarThread.');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.neynar.com/v1/farcaster/all-casts-in-thread?threadHash=${threadHash}&viewerFid=${userFid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json() as NeynarCastThreadV1Response;
        setData(json.result.casts);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [threadHash, userFid]);

  return { casts: data, loading, error };
}

export default useNeynarThread;