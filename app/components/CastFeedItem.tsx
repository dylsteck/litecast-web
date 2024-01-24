/* eslint-disable @next/next/no-img-element */
import { NeynarCastV2 } from "../types";
import { GHOST_USER_PFP_URL } from "../utils/consts";
import { FaComment, FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { getRelativeTime } from "../utils/getRelativeTime";


export default function CastFeedItem({ cast }: { cast: NeynarCastV2 }){

    const renderImages = () => {
        const regex = /https?:\/\/\S+\.(?:jpg|jpeg|png|gif)/g;
        const textMatches = cast.text.match(regex) || [];
      
        const embedMatches = cast.embeds
          .filter(embed => embed.url && embed.url.match(regex))
          .map(embed => embed.url);
      
        const allMatches = Array.from(new Set([...textMatches, ...embedMatches]));
      
        return allMatches.map((url) => (
          <img key={url} src={url} alt={`Img for ${url}`} className="w-auto h-auto max-w-[20vw] max-h-[25vh] rounded-md" />
        ));
      };

    return(
        <div className="border-b border-black flex flex-row gap-2 p-3 pl-4">
            <img src={cast.author.pfp_url ?? GHOST_USER_PFP_URL} width={12} height={12} className="w-7 h-7 rounded-full" alt={`PFP for @${cast.author.username}`} />
            <div>
                <div className="flex flex-row gap-1">
                    <p>{cast.author.display_name}</p>
                    <p className="text-gray-700/80">@{cast.author.username}</p>
                    <p className="text-gray-700/80">· {getRelativeTime(cast.timestamp)}</p>
                </div>
                <p className="pt-1 pr-2 whitespace-pre-line break-all max-w-full">
                    {cast.text}
                    <div className="pt-2 pb-2 flex flex-row gap-2">
                        {renderImages()}
                    </div>
                </p>
                <div className="flex flex-row gap-2 pt-3 text-black/70 text-sm">
                    <div className="flex flex-row gap-1 items-center">
                        <FaHeart size={10} />
                        <p>{cast.reactions.likes.length} likes</p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <FaComment size={10} />
                        <p>{cast.replies.count} replies</p>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <FaArrowsSpin size={10} />
                        <p>{cast.reactions.recasts.length} recasts</p> 
                    </div>
                </div>
            </div>
        </div>
    )
}