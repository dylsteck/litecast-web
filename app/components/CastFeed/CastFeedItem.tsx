/* eslint-disable @next/next/no-img-element */
import { NeynarCastV2 } from "../../types";
import { GHOST_USER_PFP_URL } from "../../utils/consts";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { getRelativeTime } from "../../utils/getRelativeTime";
import Link from "next/link";
import { ExpandableImage } from "../ExpandableImage";
import CastReactionItem from "../CastReactionItem";
import CastEmbeds from "../CastFrames";
import CastFrames from "../CastFrames";
import CastByHash from "../CastByHash";


export default function CastFeedItem({ cast }: { cast: NeynarCastV2 }){

    const renderEmbeddedCasts = () => {
        const embeddedCasts = cast.embeds.filter(embed => embed.cast_id);
        return embeddedCasts.map((embed, index) => (
            <CastByHash key={`cast-by-hash-${index}`} hash={embed.cast_id?.hash ?? ''} />
        ));
    }

    // todos:
    // 1: move into one function
    // 2: fix how it all looks
    // 3: if its a warpcast url add it to the CastByHash

    const renderImages = () => {
        const regex = /https?:\/\/\S+\.(?:jpg|jpeg|png|gif)/g;
        const textMatches = cast.text.match(regex) || [];
      
        const embedMatches = cast.embeds
          .filter(embed => embed.url && embed.url.match(regex))
          .map(embed => embed.url);
      
        const allMatches = Array.from(new Set([...textMatches, ...embedMatches]));
      
        return allMatches.map((url, index) => (
            <ExpandableImage imageUrl={url ?? GHOST_USER_PFP_URL} rounded={false} key={index} />
        ));
      };

      const renderVideos = () => {
        const regex = /https?:\/\/\S+\.(?:mp4|webm|mov|m3u8)/g;
        const textMatches = cast.text.match(regex) || [];
      
        const embedMatches = cast.embeds
          .filter(embed => embed.url && embed.url.match(regex))
          .map(embed => embed.url);
      
        const allMatches = Array.from(new Set([...textMatches, ...embedMatches]));
      
        return allMatches.map((url, index) => (
            // todo: add .m3u8 support(warpcast's video format), need to set up some middleware
            !url?.endsWith('.m3u8')  &&
            <video src={url} controls key={`video-${index}`} className="border-b border-black p-2" />
        ));
      }
      
    return(
        <div className="flex flex-row gap-2">
            <Link href={`/${cast.author.username}`} className="min-w-7 max-w-12 min-h-7 max-h-12">
                <img src={cast.author.pfp_url ?? GHOST_USER_PFP_URL} width={12} height={12} className="w-7 h-7 rounded-full" alt={`PFP for @${cast.author.username}`} />
            </Link>
            <div>
                <div className="flex flex-row gap-1">
                    <Link href={`/${cast.author.username}`}>
                        <p>{cast.author.display_name}</p>
                    </Link>
                    <p className="text-gray-700/80">@{cast.author.username}</p>
                    <p className="text-gray-700/80">· {getRelativeTime(cast.timestamp)}</p>
                </div>
                <p className="pt-1 pr-2 whitespace-pre-line break-all max-w-full">
                    <Link href={`/${cast.author.username}/${cast.hash}`}>
                        <p>{cast.text}</p>
                    </Link>
                    <div className="pt-2 pb-2 flex flex-row gap-3">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-3 items-center">
                                {renderEmbeddedCasts()}
                            </div>
                            <div className="flex flex-row gap-3 items-center">
                                {renderImages()}
                            </div>
                            <div className="flex flex-row gap-3 items-center">
                                {renderVideos()}
                            </div>
                            {cast.frames && <CastFrames hash={cast.hash} frames={cast.frames} />}
                        </div>
                    </div>
                </p>
                <div className="flex flex-row gap-2 pt-3 text-black/70 text-sm">
                    <CastReactionItem type="like" count={cast.reactions.likes.length} hash={cast.hash} />
                    <div className="flex flex-row gap-1 items-center">
                        <FaComment size={10} />
                        <p>{cast.replies.count} replies</p>
                    </div>
                    <CastReactionItem type="recast" count={cast.reactions.recasts.length} hash={cast.hash} />
                </div>
            </div>
        </div>
    )
}