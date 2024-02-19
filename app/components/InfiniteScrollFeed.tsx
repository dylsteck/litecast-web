import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type InfiniteScrollFeedProps = {
    dataLength: number;
    children: React.ReactNode;
    loadMore: () => any;
    hasMore: boolean;
    isLoading: boolean;
    endMessage: string;
    scrollableTarget: string;
};

export default function InfiniteScrollFeed({ dataLength, children, loadMore, hasMore, isLoading, endMessage, scrollableTarget }: InfiniteScrollFeedProps){
    return (
        <div id={scrollableTarget} style={{ height: '99%', overflow: 'auto' }}>
            <InfiniteScroll
                dataLength={dataLength}
                next={loadMore}
                hasMore={!isLoading && hasMore}
                loader={<p className="p-3">Loading...</p>}
                endMessage={<p className="p-3">{endMessage}</p>}
                scrollableTarget={scrollableTarget}
            >
                {children}
            </InfiniteScroll>
        </div>
    );
}