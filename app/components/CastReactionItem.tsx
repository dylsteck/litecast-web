import { FaHeart } from "react-icons/fa";
import { FaArrowsSpin } from "react-icons/fa6";
import { useReaction } from "../providers/NeynarProvider";
import { useState } from "react";

export default function CastReactionItem({ type, count, hash }: { type: 'like' | 'recast', count: number, hash: string }){
    const [posted, setPosted] = useState<boolean>(false);
    const postReaction = useReaction();
    // todo: re-enable once you have the logic to locally update the number of likes/recasts as well
    const handleClick = async() => {
        // try {
        //     await postReaction(type, hash);
        //     setPosted(true)
        //   } catch (error) {
        //     console.error('Error posting reaction:', error);
        // }
    }

    return(
        <div className="flex flex-row gap-1 items-center" onClick={handleClick}>
            {type === 'like' ? <FaHeart size={10} className={`${posted ? 'text-red-600' : ''}`} /> :  <FaArrowsSpin size={10} />}
            <p>{`${count} ${type}s`}</p>
        </div>
    )
}