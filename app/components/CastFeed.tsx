"use client"
import { useLatestCasts } from "../providers/NeynarProvider"
import { NeynarCastV2 } from "../types";
import CastFeedItem from "./CastFeedItem";

export default function CastFeed(){
    const { casts, isLoading, isReachingEnd, loadMore } = useLatestCasts();
    // note: should add error to this 
    return(
        <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
            {casts && casts.map((item: NeynarCastV2, index) => {
                return <CastFeedItem cast={item} key={`cast-feed-item-${index}`} />
            })}
        </div>
    )
}