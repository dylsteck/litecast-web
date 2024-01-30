import { useState, useEffect } from 'react';
import { NeynarCastThreadV1Response, NeynarCastV1 } from './useNeynarThread';

type NeynarV2Notifications = {
    notifications: Notification[];
    next: {
        cursor: string;
    };
}

type Notification = {
    object: string;
    most_recent_timestamp: string;
    type: string;
    cast?: {
        object: string;
        hash: string;
        thread_hash: string;
        parent_hash: string | null;
        parent_url: string | null;
        root_parent_url: string | null;
        parent_author: {
            fid: string;
        } | null;
        author: {
            object: string;
            fid: number | null;
            custody_address: string;
            username: string;
            display_name: string;
            pfp_url: string;
            profile: {
                bio: {
                    text: string;
                    mentioned_profiles: any[];
                };
            };
            follower_count: number;
            following_count: number;
            verifications: string[];
            active_status: string;
        };
        text: string;
        timestamp: string;
        embeds: {
            url?: string;
        }[];
        reactions: {
            likes: {
                fid: number;
                fname: string;
            }[];
            recasts: {
                fid: number;
                fname: string;
            }[];
        };
        replies: {
            count: number;
        };
        mentioned_profiles: {
            object: string;
            fid: number;
            custody_address: string;
            username: string;
            display_name: string;
            pfp_url: string;
            profile: {
                bio: {
                    text: string;
                    mentioned_profiles: any[];
                };
            };
            follower_count: number;
            following_count: number;
            verifications: string[];
            active_status: string;
        }[];
        viewer_context: {
            liked: boolean;
            recasted: boolean;
        };
    };
    reactions?: {
        object: string;
        cast: {
            object: string;
            hash: string;
        };
        user: {
            object: string;
            fid: number | null;
            custody_address: string;
            username: string;
            display_name: string;
            pfp_url: string;
            profile: {
                bio: {
                    text: string;
                    mentioned_profiles: any[];
                };
            };
            follower_count: number;
            following_count: number;
            verifications: string[];
            active_status: string;
        };
    }[];
    follows?: {
        object: string;
        user: {
            object: string;
            fid: number | null;
            custody_address: string;
            username: string;
            display_name: string;
            pfp_url: string;
            profile: {
                bio: {
                    text: string;
                    mentioned_profiles: any[];
                };
            };
            follower_count: number;
            following_count: number;
            verifications: string[];
            active_status: string;
        };
    }[];
}

function useNeynarNotifications(userFid: number, cursor?: string) {
  const [data, setData] = useState<Notification[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  if(userFid === 0){
    throw new Error('You must pass userFID to useNeynarNotifications.');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.neynar.com/v2/farcaster/notifications?fid=${userFid}&limit=25${cursor && `&cursor=${cursor}`}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.NEXT_PUBLIC_NEYNAR_API_KEY as string,
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json() as NeynarV2Notifications;
        setData(json.notifications);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userFid, cursor]);

  return { notifications: data, loading, error };
}

export default useNeynarNotifications;