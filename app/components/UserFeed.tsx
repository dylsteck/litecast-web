import { FunctionComponent } from 'react';
import { useLogin } from "../providers/NeynarProvider"
import ThreadFeedItem from './ThreadFeed/ThreadFeedItem';
import ModEditor from './ModEditor';
import useNeynarThread from '../hooks/useNeynarThread';
import { type NeynarCastV1 } from '../types';
import useNeynarCastsByUser from '../hooks/useNeynarCastsByUser';
import InfiniteScrollFeed from './InfiniteScrollFeed';

interface UserFeedProps {
  fid: number;
  username: string;
  pfp: string;
}

const UserFeed: FunctionComponent<UserFeedProps> = ({ fid, username, pfp }) => {
   const  { farcasterUser } = useLogin();
   const { casts, isLoading, isReachingEnd, loadMore } = useNeynarCastsByUser(fid, farcasterUser?.fid ?? 616);
   if(isLoading) return<p>Loading...</p>

   return( 
    <>
    {casts !== null && casts.length > 0 &&
        <InfiniteScrollFeed
          dataLength={casts.length}
          loadMore={loadMore}
          hasMore={!isLoading && !isReachingEnd}
          isLoading={isLoading}
          endMessage="No more data to load."
          scrollableTarget="scrollableUserCastsDiv"
        >
        <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
          {casts && casts.length > 0 && casts.map((item: NeynarCastV1, index) => {
            return (
            <div key={`cast-feed-item-${index}`} className="border-b border-black p-3">
              <ThreadFeedItem cast={item} />
            </div>
          )})}
        </div>
      </InfiniteScrollFeed>
    }
    </>
   )
}

export default UserFeed;
