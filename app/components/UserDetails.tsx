/* eslint-disable @next/next/no-img-element */
import { type NeynarV1User } from "../types";

export default function UserDetails({ neynarUser }: { neynarUser: NeynarV1User }){
    return(
        <div className="pl-2 pt-1.5 pb-2.5 border-b border-gray-400">
            <div className="flex flex-row gap-2 items-start">
                <img src={neynarUser.pfp.url} alt={`PFP for @${neynarUser.username}`} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex flex-col gap-[0.5px]">
                    <p className="text-lg font-medium">{neynarUser.displayName}</p>
                    <p className="text-sm text-gray-600/85">@{neynarUser.username}</p>
                    <p>{neynarUser.profile.bio.text}</p>
                    <div className="flex flex-row gap-2">
                        <p><span className="font-medium">{neynarUser.followerCount.toLocaleString()}</span> followers</p>
                        <p><span className="font-medium">{neynarUser.followingCount.toLocaleString()}</span>  following</p>
                        {/* todo: get user location */}
                    </div>
                </div>
            </div>
        </div>
    )
}