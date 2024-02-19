export interface SIWNResponseData {
    fid: string;
    is_authenticated: boolean;
    signer_uuid: string;
}

export interface SIWNWindow extends Window {
    onSignInSuccess?: (data: SIWNResponseData) => void;
}

export type NeynarFrame = {
    version: string;
    image: string;
    buttons: Array<{
        index: number;
        title: string;
    }>;
    post_url: string;
    frames_url: string;
};

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

export type NeynarCastV2 = {
    object: string;
    hash: string;
    thread_hash: string;
    parent_hash: string | null;
    parent_url: string | null;
    root_parent_url: string | null;
    parent_author: { fid: number | null } | { fid: string | null };
    author: {
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
    };
    text: string;
    timestamp: string;
    embeds: Array<{
        cast_id?: { fid: number; hash: string };
        url?: string;
    }>;
    frames?: Array<NeynarFrame>;
    reactions: {
        likes: Array<{ fid: number; fname: string }>;
        recasts: Array<{ fid: number; fname: string }>;
    };
    replies: {
        count: number;
    };
    mentioned_profiles: any[];
    viewer_context?: {
        liked: boolean;
        recasted: boolean;
    };
};

export type Author = {
    object: string;
    fid: number;
    custody_address: string;
    username: string;
    display_name: string;
    pfp_url: string | null;
    profile: {
        bio: {
            text: string | null;
            mentioned_profiles: any[];
        };
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    active_status: string;
};

export type SearchcasterResponse = {
  casts: Array<SearchcasterCast>;
  meta: {
    count: number;
    responseTime: number;
  };
};

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
  
export type SearchcasterResponse = {
    casts: Array<SearchcasterCast>;
    meta: {
      count: number;
      responseTime: number;
    };
};