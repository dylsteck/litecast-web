/* eslint-disable @next/next/no-img-element */
import { NeynarCastV2 } from "../types";
import { GHOST_USER_PFP_URL } from "../utils/consts";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { getRelativeTime } from "../utils/getRelativeTime";
import Link from "next/link";
import { ExpandableImage } from "./ExpandableImage";
import CastReactionItem from "./CastReactionItem";
import CastText from "./CastText";
import CastEmbeds from "./CastFrames";
import { SearchcasterCast } from "../search/page";


export default function SearchCastItem({ cast }: { cast: SearchcasterCast }){

    const renderImages = () => {
        const regex = /https?:\/\/\S+\.(?:jpg|jpeg|png|gif)/g;
        const textMatches = cast.body.data.text.match(regex) || [];
      
        const embedMatches = cast.body.data.embeds.images
          .filter(embed => embed.url && embed.url.match(regex))
          .map(embed => embed.url);
      
        const allMatches = Array.from(new Set([...textMatches, ...embedMatches]));
      
        return allMatches.map((url, index) => (
            <ExpandableImage imageUrl={url ?? GHOST_USER_PFP_URL} rounded={false} key={index} />
        ));
      };
    return(
        <div className="border-b border-black flex flex-row gap-2 p-3 pl-4">
            <Link href={`/${cast.body.username}`} className="min-w-7 max-w-12 min-h-7 max-h-12">
                <img src={cast.meta.avatar ?? GHOST_USER_PFP_URL} width={12} height={12} className="w-7 h-7 rounded-full" alt={`PFP for @${cast.body.username}`} />
            </Link>
            <div>
                <div className="flex flex-row gap-1">
                    <Link href={`/${cast.body.username}`}>
                        <p>{cast.meta.displayName}</p>
                    </Link>
                    <p className="text-gray-700/80">@{cast.body.username}</p>
                    <p className="text-gray-700/80">· {getRelativeTime(cast.body.publishedAt)}</p>
                </div>
                <p className="pt-1 pr-2 whitespace-pre-line break-all max-w-full">
                    <Link href={`/${cast.body.username}/${cast.body.data.replyParentMerkleRoot || cast.body.data.threadMerkleRoot}`}>
                        <CastText text={cast.body.data.text} />
                    </Link>
                    <div className="pt-2 pb-2 flex flex-row gap-3">
                        {cast.body.data.embeds && cast.body.data.embeds.images && renderImages()}
                        {/* <CastEmbeds hash={cast.body.data.replyParentMerkleRoot} embeds={cast.body.data.embeds} /> */}
                    </div>
                </p>
                <div className="flex flex-row gap-2 pt-3 text-black/70 text-sm">
                    <CastReactionItem type="like" count={cast.meta.reactions.count} hash={cast.body.data.replyParentMerkleRoot || cast.body.data.threadMerkleRoot as string} />
                    <div className="flex flex-row gap-1 items-center">
                        <FaComment size={10} />
                        <p>{cast.meta.mentions ? cast.meta.mentions.length : 0} replies</p>
                    </div>
                    <CastReactionItem type="recast" count={cast.meta.recasts.count} hash={cast.body.data.replyParentMerkleRoot || cast.body.data.threadMerkleRoot as string} />
                </div>
            </div>
        </div>
    )
}