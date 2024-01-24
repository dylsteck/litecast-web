/* eslint-disable @next/next/no-img-element */
import { NeynarCastV2 } from "../types";
import { GHOST_USER_PFP_URL } from "../utils/consts";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { getRelativeTime } from "../utils/getRelativeTime";
import Link from "next/link";
import { NeynarCastV1 } from "../hooks/useNeynarThread";
import { ExpandableImage } from "./ExpandableImage";
import CastReactionItem from "./CastReactionItem";


export default function ThreadFeedItem({ cast }: { cast: NeynarCastV1 }){

    const renderImages = () => {
        const regex = /https?:\/\/\S+\.(?:jpg|jpeg|png|gif)/g;
        const textMatches = cast.text.match(regex) || [];
      
        const embedMatches = cast.embeds
          .filter(embed => embed.url && embed.url.match(regex))
          .map(embed => embed.url);
      
        const allMatches = Array.from(new Set([...textMatches, ...embedMatches]));
      
        return allMatches.map((url, index) => (
            <ExpandableImage imageUrl={url} rounded={false} key={index} />
        ));
      };
    return(
        <div className="border-b border-black flex flex-row gap-2 p-3 pl-4">
            {cast.author.pfp && <Link href={`/${cast.author.username}`} className="min-w-7 max-w-12 min-h-7 max-h-12">
                <img src={cast.author.pfp.url ?? GHOST_USER_PFP_URL} width={12} height={12} className="w-7 h-7 rounded-full" alt={`PFP for @${cast.author.username}`} />
            </Link>
            }
            <div>
                <div className="flex flex-row gap-1">
                    <Link href={`/${cast.author.username}`}>
                        <p>{cast.author.displayName}</p>
                    </Link>
                    <p className="text-gray-700/80">@{cast.author.username}</p>
                    <p className="text-gray-700/80">· {getRelativeTime(cast.timestamp)}</p>
                </div>
                <p className="pt-1 pr-2 whitespace-pre-line break-all max-w-full">
                    <Link href={`/${cast.author.username}/${cast.hash}`}>
                        {cast.text}
                    </Link>
                    <div className="pt-2 pb-2 flex flex-row gap-3">
                        {renderImages()}
                    </div>
                </p>
                <div className="flex flex-row gap-2 pt-3 text-black/70 text-sm">
                    <CastReactionItem type="like" count={cast.reactions.count} hash={cast.hash} />
                    <div className="flex flex-row gap-1 items-center">
                        <FaComment size={10} />
                        <p>{cast.replies.count} replies</p>
                    </div>
                    <CastReactionItem type="recast" count={cast.recasts.count} hash={cast.hash} />
                </div>
            </div>
        </div>
    )
}