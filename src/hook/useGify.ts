import {useInfiniteQuery} from '@tanstack/react-query';
import {useMemo, useCallback} from 'react';
import {GiphyResponse} from '../types/Giphy';

interface UseGiphyProps {
  enabled?: boolean;
  queryKey: string[];
  queryFn: ({pageParam}: {pageParam: number}) => Promise<GiphyResponse>;
}

const useGiphy = ({queryKey, queryFn, enabled}: UseGiphyProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    enabled,
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const {pagination} = lastPage;
      if (
        pagination &&
        pagination.offset + pagination.count < pagination.total_count
      ) {
        return pagination.offset + pagination.count;
      }
      return undefined;
    },
  });

  const gifs = useMemo(
    () =>
      data?.pages
        .flatMap(page => page.data)
        .filter(gifData => !!gifData.images.fixed_width.mp4) ?? [],
    [data],
  );

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    gifs,
    isLoading,
    handleLoadMore,
    handleRefresh,
    refetch,
  };
};

export default useGiphy;
