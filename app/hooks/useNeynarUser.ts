import React from 'react';
import { type NeynarV1User } from '../types';

interface NeynarV1UserResponse {
  result: {
      user: NeynarV1User;
  };
}

function useNeynarUser(fid?: number, username?: string) {
  const [data, setData] = React.useState<NeynarV1User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const NEYNAR_GET_USERV1_BY_FID_URL = `https://api.neynar.com/v1/farcaster/user?fid=${fid}`;
  const NEYNAR_GET_USERV1_BY_USERNAME_URL = `https://api.neynar.com/v1/farcaster/user-by-username?username=${username}`;

  React.useEffect(() => {
    if ((!fid || fid < 0) && (!username || username.length === 0)) {
      // todo: throw more appropriate error codes
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch((fid && fid > 0) ? NEYNAR_GET_USERV1_BY_FID_URL : NEYNAR_GET_USERV1_BY_USERNAME_URL, {
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
  }, [NEYNAR_GET_USERV1_BY_FID_URL, NEYNAR_GET_USERV1_BY_USERNAME_URL, fid, username]);

  return { user: data, loading, error };
}

export default useNeynarUser;