import { searchPosts } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import SearchPost from "@/components/contentDisplay/searchPost/SearchPost";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  query: string;
}

export default function PostSearchContainer(props: Props) {
  const { query } = props;
  const decoded = decodeURIComponent(query);
  const agent = useAgent();

  const {
    status,
    data: posts,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchPosts", query],
    queryFn: ({ pageParam }) => searchPosts(decoded, pageParam, agent),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = posts?.pages.reduce(
    (acc, page) => acc + (page?.posts.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return (
    <div>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {posts?.pages
          .flatMap((page) => page?.posts)
          .map((post, i) => (
            <Fragment key={i}>
              {post && <SearchPost key={i} post={post} />}
            </Fragment>
          ))}
      </InfiniteScroll>

      {isFetching && !isFetchingNextPage && <FeedPostSkeleton />}
      {isEmpty && !hasNextPage && (
        <div className="border-skin-base mx-3 border-t md:mx-0">
          <FeedAlert variant="empty" message="No posts found" />
        </div>
      )}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {!isEmpty &&
        !error &&
        !isFetching &&
        !hasNextPage &&
        !isFetchingNextPage && <EndOfFeed />}
    </div>
  );
}
