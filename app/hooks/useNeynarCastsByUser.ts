import { useState, useEffect } from 'react';
import { NeynarCastThreadV1Response, NeynarCastV1 } from './useNeynarThread';

function useNeynarCastsByUser(userFid: number, viewerFid: number) {
  const [data, setData] = useState<NeynarCastV1[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  if(userFid === 0 || viewerFid === 0){
    throw new Error('You must pass either userFid or viewerFid to useNeynarCastsByUser.');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.neynar.com/v1/farcaster/casts?fid=${userFid}&viewerFid=${viewerFid}&limit=25`, {
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
  }, [userFid, viewerFid]);

  return { casts: data, loading, error };
}

export default useNeynarCastsByUser;