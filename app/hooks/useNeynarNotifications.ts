import { useState, useEffect } from 'react';
import { NeynarCastThreadV1Response } from './useNeynarThread';
import { NeynarV1User } from '../types';
import useSWRInfinite from 'swr/infinite';

type NeynarV2Notifications = {
    notifications: Notification[];
    next: {
        cursor: string;
    };
}

export type Notification = {
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

export default function useNeynarNotifications(userFid: number) {
    const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY;
    if (!apiKey) throw new Error("No Neynar API key found in environment variables");
  
    const getKey = (pageIndex: number, previousPageData: NeynarV2Notifications | null) => {
      const cursor = previousPageData?.next?.cursor;
      if (previousPageData && !previousPageData.next) return null;
      return `https://api.neynar.com/v2/farcaster/notifications?fid=${userFid}&limit=25${cursor && `&cursor=${cursor}`}`;
    };
  
    const fetcher = (url: string) => fetch(url, {
      headers: {
        'Accept': 'application/json',
        'api_key': apiKey,
      },
    }).then(res => res.json());
  
    const { data, size, setSize, error } = useSWRInfinite<NeynarV2Notifications>(getKey, fetcher);
  
    const notifications = data ? data.flatMap(page => page.notifications) : [];
    const isLoading = !data && !error;
    const isReachingEnd = data && !data[data.length - 1]?.next;
  
    const loadMore = () => {
      if (!isReachingEnd) {
        setSize(size + 1);
      }
    };
  
    return { notifications, isLoading, isReachingEnd, loadMore };
  };