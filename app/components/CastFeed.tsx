import { FunctionComponent } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLatestCasts, useLogin } from "../providers/NeynarProvider";
import CastFeedItem from "./CastFeedItem";
import ModEditor from "./ModEditor";
import { NeynarCastV2 } from "../types";

interface CastFeedProps {
  castEditorVisible?: boolean;
  username?: string;
}

const CastFeed: FunctionComponent<CastFeedProps> = ({
  castEditorVisible = false,
  username,
}) => {
  const { casts, isLoading, isReachingEnd, loadMore } = useLatestCasts();
  const { farcasterUser } = useLogin();

  const handleLoadMore = () => {
    loadMore();
  }

  return (
    <div id="scrollableDiv" style={{ height: '800px', overflow: 'auto' }}>
      {farcasterUser && castEditorVisible && <ModEditor />}
      <InfiniteScroll
        dataLength={casts.length}
        next={handleLoadMore}
        hasMore={!isLoading && !isReachingEnd}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
        scrollableTarget="scrollableDiv"
      >
        <div className="flex flex-col w-full gap-1 pb-4">
          {casts.map((item: NeynarCastV2) => (
            <CastFeedItem cast={item} key={`cast-feed-item-${item.hash}`} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CastFeed;