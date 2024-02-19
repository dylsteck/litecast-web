import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";

export default function CastReactionItem({ type, count, hash }: { type: 'like' | 'recast', count: number, hash: string }){
    const [posted, setPosted] = React.useState<boolean>(false);
    // todo: add post reaction logic

    return(
        <div className="flex flex-row gap-1 items-center">
            {type === 'like' ? <FaHeart size={10} className={`${posted ? 'text-red-600' : ''}`} /> :  <FaArrowsSpin size={10} />}
            <p>{`${count} ${type}s`}</p>
        </div>
    )
}