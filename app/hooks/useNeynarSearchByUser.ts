import React from 'react';
import { type NeynarCastV1 } from '../types';

type NeynarSearchByUserResponse = {
  result: {
    users: Array<{
      object: string;
      fid: number;
      custody_address: string;
      username: string;
      display_name: string;
      pfp_url: string;
      profile: {
        bio: {
          text: string;
        };
      };
      follower_count: number;
      following_count: number;
      verifications: string[];
      active_status: 'active' | 'inactive';
      pfp: {
        url: string;
      };
    }>;
  };
};

export default function useNeynarSearchByUser(query: string, viewerFid: number) {
  const [data, setData] = React.useState<NeynarSearchByUserResponse['result']['users'] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  if(query.length === 0){
    throw new Error('You must pass a valid query to useNeynarSearchByUser.');
  }

  if(viewerFid === 0){
    throw new Error('You must pass a valid viewerFid to useNeynarSearchByUser.');
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.neynar.com/v2/farcaster/user/search?q=${query}&viewer_fid=${viewerFid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json() as NeynarSearchByUserResponse;
        setData(json.result.users);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, viewerFid]);

  return { user: data, loading, error };
}