import React from 'react';
import { type NeynarCastV2 } from "../types";

type NeynarCastByHashResponse = {
  cast: NeynarCastV2
};

export function useNeynarCastByHash(hash: string) {
  const [data, setData] = React.useState<NeynarCastByHashResponse['cast'] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  if(hash.length === 0){
    throw new Error('You must pass a valid cast hash to useNeynarCastByHash.');
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json() as NeynarCastByHashResponse;
        setData(json.cast);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hash]);

  return { cast: data, loading, error };
}