import { useState, useEffect } from 'react';

export type NeynarV1User = {
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
}

interface NeynarV1UserResponse {
  result: {
      user: NeynarV1User;
  };
}

function useSearch(query: string, page = 0) {
  const [data, setData] = useState<NeynarV1User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const NEYNAR_GET_USERV1_BY_FID_URL = `https://api.neynar.com/v1/farcaster/user?fid=${fid}`;
  const NEYNAR_GET_USERV1_BY_USERNAME_URL = `https://api.neynar.com/v1/farcaster/user-by-username?username=${username}`;

  if(fid === null && username === null){
    throw new Error('You must pass either fid or username to useNeynarUser.');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(fid ? NEYNAR_GET_USERV1_BY_FID_URL : NEYNAR_GET_USERV1_BY_USERNAME_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json() as NeynarV1UserResponse;
        setData(json.result.user);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [NEYNAR_GET_USERV1_BY_FID_URL, NEYNAR_GET_USERV1_BY_USERNAME_URL, fid]);

  return { user: data, loading, error };
}

export default useSearch;