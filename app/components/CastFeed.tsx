import { FunctionComponent, useEffect } from "react";
import { useLatestCasts, useLogin } from "../providers/NeynarProvider";
import { NeynarCastV2 } from "../types";
import CastFeedItem from "./CastFeedItem";
import ModEditor from "./ModEditor";

interface CastFeedProps {
  castEditorVisible?: boolean;
  username?: string;
}

const CastFeed: FunctionComponent<CastFeedProps> = ({
  castEditorVisible = false,
  username,
}) => {
  const { casts, isLoading, isReachingEnd, loadMore } = useLatestCasts();

  useEffect(() => {
    console.log('latest casts', casts);
  }, [casts])
  const { farcasterUser } = useLogin();
  // note: should add error to this
  return (
    <div className="flex flex-col w-full gap-1 pb-4 overflow-y-auto">
      {farcasterUser && castEditorVisible && <ModEditor />}
      {casts &&
        casts.map((item: NeynarCastV2, index) => {
          return (
            <CastFeedItem cast={item} key={`cast-feed-item-${item.hash}`} />
          );
        })}
    </div>
  );
};

export default CastFeed;
