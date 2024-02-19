import { FunctionComponent } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLatestCasts, useLogin } from "../../providers/NeynarProvider";
import CastFeedItem from "./CastFeedItem";
import ModEditor from "../ModEditor";
import { NeynarCastV2 } from "../../types";
import InfiniteScrollFeed from "../InfiniteScrollFeed";

interface CastFeedProps {
  username?: string;
}

const CastFeed: FunctionComponent<CastFeedProps> = ({ username }) => {
  const { casts, isLoading, isReachingEnd, loadMore } = useLatestCasts();
  const { farcasterUser } = useLogin();

  const handleLoadMore = () => {
    loadMore();
  }

  return (
    <InfiniteScrollFeed
        dataLength={casts.length}
        loadMore={handleLoadMore}
        hasMore={!isLoading && !isReachingEnd}
        isLoading={isLoading}
        endMessage="No more data to load."
        scrollableTarget="scrollableDiv"
    >
      <div className="flex flex-col w-full gap-1 pb-4">
        {casts.map((item: NeynarCastV2) => (
          <div className="border-b border-black p-3 pl-4" key={`cast-feed-item-${item.hash}`}>
            <CastFeedItem cast={item} />
          </div>
        ))}
      </div>
    </InfiniteScrollFeed>
  );
};

export default CastFeed;