import { deletePost, getPost } from '@/services/post.service';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const postsQueryKey = 'posts';

export function usePostsQuery(page = 1, limit = 10, search = '') {
  return useQuery({
    queryKey: [
      postsQueryKey,
      {
        pagination: {
          page,
          limit,
        },
        filter: {
          search,
        },
      },
    ],
    queryFn: () => getPost(page, limit, search),
    placeholderData: keepPreviousData,
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation<unknown, unknown, { id: string }>({
    mutationFn: ({ id }) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [postsQueryKey],
      });
    },
  });
}
