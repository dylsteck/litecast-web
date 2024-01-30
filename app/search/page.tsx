"use client"
import { usePathname } from "next/navigation";
import CastFeed from "../components/CastFeed";
import PageLayout from "../components/PageLayout";
import { useLogin } from "../providers/NeynarProvider";
import useNeynarUser from "../hooks/useNeynarUser";
import UserDetails from "../components/UserDetails";
import UserFeed from "../components/UserFeed";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import SearchCastItem from "../components/SearchCastItem";

export type SearchcasterCast = {
  body: {
    publishedAt: number;
    username: string;
    data: {
      text: string;
      image: string | null;
      embeds: {
        urls: Array<{
          type: string;
          openGraph?: {
            url: string;
            frame?: {
              buttons: Array<{
                index: number;
                title: string;
              }>;
              postUrl: string;
              version: string;
              imageUrl: string;
            };
            image: string;
            title: string;
            domain: string;
            sourceUrl: string;
            frameDebug?: {
              image: string;
              valid: boolean;
              buttons: Array<{
                index: number;
                title: string;
              }>;
              postUrl: string;
              version: string;
              imageUrl: string;
              postUrlTooLong: boolean;
              fallbackToImageUrl: boolean;
              buttonsAreOutOfOrder: boolean;
            };
            description: string;
            useLargeImage: boolean;
          };
        }>;
        images: Array<{
          alt: string;
          url: string;
          type: string;
          media: {
            width: number;
            height: number;
            version: string;
            staticRaster: string;
          };
          sourceUrl: string;
        }>;
        videos: Array<unknown>;
        unknowns: Array<unknown>;
        processedCastText: string;
      };
      replyParentMerkleRoot: string | null;
      threadMerkleRoot: string;
    };
  };
  meta: {
    displayName: string;
    avatar: string;
    isVerifiedAvatar: boolean;
    numReplyChildren: number;
    reactions: {
      count: number;
      type: string;
    };
    recasts: {
      count: number;
    };
    watches: {
      count: number;
    };
    replyParentUsername: {
      fid: number | null;
      username: string | null;
    };
    mentions: Array<{
      fid: number;
      pfp: {
        url: string;
        verified: boolean;
      };
      username: string;
      displayName: string;
    }> | null;
    tags: Array<{
      id: string;
      name: string;
      type: string;
      imageUrl: string;
    }>;
  };
  merkleRoot: string;
  uri: string;
}

type SearchcasterResponse = {
  casts: Array<SearchcasterCast>;
  meta: {
    count: number;
    responseTime: number;
  };
};

export type Category = 'Casts' | 'Channels' | 'Users';

export default function SearchPage(){
  const [category, setCategory] = useState<Category>('Casts');
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResults] = useState<SearchcasterResponse | null>(null);
  const { farcasterUser: authenticatedUser } = useLogin();

  const getSearch = useCallback(async () => {
    if (query && query.length > 0) {
      try {
        const response = await fetch(`https://searchcaster.xyz/api/search?text=${query}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json() as SearchcasterResponse;
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setSearchResults(null);
      }
    }
  }, [query]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  const handleSearch = (value: string, newCategory: string) => {
    setQuery(value);
    newCategory !== category && setCategory(newCategory as Category);
  }

  return(
    <PageLayout title="Search" isSearch={true} handleSearch={(value: string, category: string) => handleSearch(value, category)}>
        {searchResult !== null && searchResult.casts && searchResult.casts.map((searchCast: SearchcasterCast, index: number) => {
            return <SearchCastItem cast={searchCast} key={`search-cast-${index}`} />
        })}
    </PageLayout>
  )
}