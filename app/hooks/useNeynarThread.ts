import { useState, useEffect } from 'react';
import { NeynarCastV1 } from '../types';

export type NeynarCastThreadV1Response =  {
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