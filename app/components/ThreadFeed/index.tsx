import { FunctionComponent } from 'react';
import { useLogin } from "../../providers/NeynarProvider"
import ThreadFeedItem from './ThreadFeedItem';
import ModEditor from '../ModEditor';
import useNeynarThread from '../../hooks/useNeynarThread';
import { type NeynarCastV1 } from '@/app/types';

interface ThreadFeedProps {
  hash: string;
}

const ThreadFeed: FunctionComponent<ThreadFeedProps> = ({
  hash,
}) => {
    const  { farcasterUser } = useLogin();
    const { casts, loading, error } = useNeynarThread(hash, farcasterUser?.fid ?? 616);
    return(
        <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
            {/* todo: fix so ModEditor dynamically shows up right under the cast to reply to */}
            {casts && casts.length > 0 &&
            <>
              <div className="p-3">
                <ThreadFeedItem cast={casts[0]} />
              </div>
              <div className="border-t border-b border-black">
                <ModEditor hash={casts[0].hash} />
              </div>
              {casts.slice(1).length > 0 && casts.slice(1).map((item: NeynarCastV1, index) => {
                return(
                <div className="p-3 border-b border-black" key={`cast-feed-item-${index}`}>
                  <ThreadFeedItem cast={item} />
                </div>
              )})}
            </>}
        </div>
    )
}

export default ThreadFeed;