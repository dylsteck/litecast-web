/* eslint-disable @next/next/no-img-element */
import { type Notification } from "@/app/hooks/useNeynarNotifications";
import { GHOST_USER_PFP_URL } from "@/app/utils/consts";
import CastFeedItem from "../CastFeed/CastFeedItem";
import { NeynarCastV2 } from "@/app/types";

export default function NotificationsFeedItem({ notification }: { notification: Notification}){
    switch(notification.type){
        case "follows":
            return (
                <div className="p-2 pl-4">
                    {notification?.follows?.length === 1 ? 
                        <p>
                            <span className="font-medium">{notification?.follows[0].user.username}</span> followed you
                        </p> : notification.follows && notification?.follows?.length > 1 &&
                        <>
                            <p>
                                <span className="font-medium">{notification?.follows[0].user.username}</span> and 
                                <span className="font-medium pr-1"> {(notification?.follows?.length - 1).toLocaleString()} others</span> followed you
                            </p>
                            <div className="flex flex-row gap-2 items-center overflow-none pt-1">
                                {notification?.follows?.splice(0,10).map((follower, index) => (
                                    <div key={`follower-${index}`}>
                                        <img src={follower.user.pfp_url ?? GHOST_USER_PFP_URL} width={12} height={12} className="w-7 h-7 rounded-full" alt={`PFP for @${follower.user.username}`} />
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            );
        case "likes":
            return (
                <div className="p-2 pl-4">
                    {notification.cast && notification.cast.reactions.likes.length > 0 &&
                        <>
                            {notification.cast.reactions.likes.length === 1 ? 
                                <p>
                                    <span className="font-medium">{notification.cast.reactions.likes[0].fname}</span> liked your cast
                                </p>
                                : 
                                <p>
                                    <span className="font-medium">{notification.cast.reactions.likes[0].fname} and {(notification.cast.reactions.likes.length - 1).toLocaleString()} others</span> liked your cast
                                </p>
                            }
                            {/* todo: move cast embed to its own item and remove padding/border from default */}
                            <div className="pt-3">
                                <CastFeedItem cast={notification.cast as NeynarCastV2} />
                            </div>
                        </>
                    }
                </div>
            );
        case "mention":
            return (
                <div className="p-2 pl-4">
                    <p>
                        <span className="font-medium">{notification.cast?.author.username}</span> mentioned you
                        {/* todo: move cast embed to its own item and remove padding/border from default */}
                        <div className="pt-3">
                            <CastFeedItem cast={notification.cast as NeynarCastV2} />
                        </div>
                    </p>
                </div>
            );
        case "recasts":
            return (
                <div className="p-2 pl-4">
                    {notification.reactions && notification.reactions.length > 0 &&
                        <>
                            {notification.reactions.length === 1 ? 
                                <p>
                                    <span className="font-medium">{notification.reactions[0].user.username}</span> recasted your cast
                                </p>
                                : 
                                <p>
                                    <span className="font-medium">{notification.reactions[0].user.username} and {(notification.reactions.length - 1).toLocaleString()} others</span> recasted your cast
                                </p>
                            }
                            {/* todo: move cast embed to its own item and remove padding/border from default */}
                            <div className="pt-3">
                                <CastFeedItem cast={notification.cast as NeynarCastV2} />
                            </div>
                        </>
                    }
                </div>
            );
        case "reply":
            return (
                <div className="p-2 pl-4">
                    <p>
                        <span className="font-medium">{notification.cast?.author.username}</span> replied to your cast
                        {/* todo: move cast embed to its own item and remove padding/border from default */}
                        <div className="pt-3">
                            <CastFeedItem cast={notification.cast as NeynarCastV2} />
                        </div>
                    </p>
                </div>
            );
        default: 
            return (
                <div className="p-2 pl-4">
                    <p>Unknown notification type: {notification.type}</p>
                </div>
            );
    }
}