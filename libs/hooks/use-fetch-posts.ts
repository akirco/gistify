import fetcher from '../utils/fetcher';
import useSWR from 'swr';

export function useFetchPosts(pageCount: number) {
  const { data, error, isLoading } = useSWR<Blog.Posts>(
    `/api/page?count=${pageCount}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}

export function useFetchTotal() {
  const { data, error, isLoading } = useSWR<{ count: string }>(
    `/api/total`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}
