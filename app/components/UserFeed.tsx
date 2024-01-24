import { FunctionComponent } from 'react';
import { useLogin } from "../providers/NeynarProvider"
import ThreadFeedItem from './ThreadFeedItem';
import ModEditor from './ModEditor';
import useNeynarThread, { NeynarCastV1 } from '../hooks/useNeynarThread';
import useNeynarCastsByUser from '../hooks/useNeynarCastsByUser';

interface UserFeedProps {
  fid: number;
  username: string;
  pfp: string;
}

const UserFeed: FunctionComponent<UserFeedProps> = ({ fid, username, pfp }) => {
    const  { farcasterUser } = useLogin();
    const { casts, loading, error } = useNeynarCastsByUser(fid, farcasterUser?.fid ?? 616);
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>
    return(
        <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
          {casts && casts.length > 0 && casts.map((item: NeynarCastV1, index) => {
            return <ThreadFeedItem cast={{...item, author: {...item.author, username: username, pfp: {...item.author.pfp, url: pfp}}}} key={`cast-feed-item-${index}`} />
          })}
        </div>
    )
}

export default UserFeed;