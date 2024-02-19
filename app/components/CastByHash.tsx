import { useNeynarCastByHash } from "../hooks/useNeynarCastByHash";
import CastFeedItem from "./CastFeed/CastFeedItem";

export default function CastByHash({ hash }: { hash: string }){
    const { cast, loading, error } = useNeynarCastByHash(hash);
    if(loading) return <div className="p-3">Loading</div>
    if(error) return <div className="p-3">{`Error: ${error}`}</div>

    if(cast !== null) return (
    <div className="border border-gray-700/80 p-2.5">
        <CastFeedItem cast={cast} />
    </div>
    )
}