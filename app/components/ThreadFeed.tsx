import { FunctionComponent } from 'react';
import { useLogin } from "../providers/NeynarProvider"
import ThreadFeedItem from './ThreadFeedItem';
import ModEditor from './ModEditor';
import useNeynarThread, { NeynarCastV1 } from '../hooks/useNeynarThread';

interface ThreadFeedProps {
  castEditorVisible?: boolean;
  hash: string;
}

const ThreadFeed: FunctionComponent<ThreadFeedProps> = ({
  castEditorVisible = false,
  hash,
}) => {
    const  { farcasterUser } = useLogin();
    const { casts, loading, error } = useNeynarThread(hash, farcasterUser?.fid ?? 616);
    return(
        <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
          {/* todo: fix so ModEditor dynamically shows up right under the cast to reply to */}
            {casts && casts.length > 0 &&
            <>
              <ThreadFeedItem cast={casts[0]} />
              <ModEditor hash={casts[0].hash} />
              {casts.slice(1).length > 0 && casts.slice(1).map((item: NeynarCastV1, index) => {
                return <ThreadFeedItem cast={item} key={`cast-feed-item-${index}`} />
              })}
            </>}
        </div>
    )
}

export default ThreadFeed;