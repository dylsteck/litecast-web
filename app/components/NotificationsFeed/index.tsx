import { useLogin } from "@/app/providers/NeynarProvider";
import useNeynarNotifications from "@/app/hooks/useNeynarNotifications";
import NotificationsFeedItem from "./NotificationsFeedItem";
import InfiniteScrollFeed from "../InfiniteScrollFeed";

export default function NotificationsFeed() {
    const { farcasterUser } = useLogin();
    const { notifications, isLoading, isReachingEnd, loadMore } = useNeynarNotifications(farcasterUser?.fid ?? 616);

    if (isLoading) return <div className="p-3">Loading...</div>;
    
    return (
        
    <InfiniteScrollFeed
        dataLength={notifications.length}
        loadMore={loadMore}
        hasMore={!isLoading && !isReachingEnd}
        isLoading={isLoading}
        endMessage="No more data to load."
        scrollableTarget="scrollableUserNotificationsDiv"
      >
      <div className="flex flex-col gap-3 divide-y divide-black/80">
            {notifications && notifications.map((notification, index) => <NotificationsFeedItem key={`notification-feed-item-${index}`} notification={notification} />)}
        </div>
    </InfiniteScrollFeed>
    );
}