export interface SIWNResponseData {
    fid: string;
    is_authenticated: boolean;
    signer_uuid: string;
}

export interface SIWNWindow extends Window {
    onSignInSuccess?: (data: SIWNResponseData) => void;
}

export type NeynarCastV2 = {
    object: string;
    hash: string;
    thread_hash: string;
    parent_hash: string | null;
    parent_url: string | null;
    root_parent_url: sstring | null;
    parent_author: ParentAuthor;
    author: Author;
    text: string;
    timestamp: string;
    embeds: Embed[];
    reactions: Reactions;
    replies: {
        count: number;
    };
    mentioned_profiles: Author[];
};

export type ParentAuthor = {
    fid: number | null;
};

export type Author = {
    object: string;
    fid: number;
    custody_address: string;
    username: string;
    display_name: string;
    pfp_url: string | null;
    profile: {
        bio: Bio;
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    active_status: string;
};

export type Bio = {
    text: string | null;
    mentioned_profiles: any[];
};

export type Embed = {
    url?: string;
    cast_id?: {
        fid: number;
        hash: string;
    };
};

export type Reactions = {
    likes: ReactionDetail[];
    recasts: ReactionDetail[];
};

export type ReactionDetail = {
    fid: number;
    fname: string;
};