import { type NeynarCastV1, type NeynarCastV2 } from "../../types";
import CastFeedItem from "../CastFeed/CastFeedItem";


export default function ThreadFeedItem({ cast }: { cast: NeynarCastV1 }){

    const convertNeynarCastV1ToV2 = (cast: NeynarCastV1): NeynarCastV2 => {
        return {
          object: 'cast',
          hash: cast.hash,
          thread_hash: cast.threadHash,
          parent_hash: cast.parentHash,
          parent_url: cast.parentUrl,
          root_parent_url: cast.rootParentUrl,
          parent_author: cast.parentAuthor ? { fid: cast.parentAuthor.fid } : { fid: null },
          author: {
            object: 'author',
            fid: cast.author.fid,
            custody_address: cast.author.custodyAddress,
            username: cast.author.username,
            display_name: cast.author.displayName,
            pfp_url: cast.author.pfp.url,
            profile: {
              bio: {
                text: cast.author.profile.bio.text,
                mentioned_profiles: cast.author.profile.bio.mentionedProfiles,
              },
            },
            follower_count: cast.author.followerCount,
            following_count: cast.author.followingCount,
            verifications: cast.author.verifications,
            active_status: cast.author.activeStatus,
          },
          text: cast.text,
          timestamp: cast.timestamp,
          embeds: cast.embeds.map(embed => ({ url: embed.url })),
          reactions: {
            likes: cast.reactions.fids.map((fid, index) => ({ fid, fname: cast.reactions.fnames[index] })),
            recasts: cast.recasts.fids.map(fid => ({ fid, fname: '' })),
          },
          replies: {
            count: cast.replies.count,
          },
          mentioned_profiles: cast.mentionedProfiles,
          viewer_context: cast.viewerContext,
        };
      };  
    return <CastFeedItem cast={convertNeynarCastV1ToV2(cast)} />;
}