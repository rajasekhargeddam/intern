import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import { deletePost } from "../services/posts";
import type { UserPost } from "../types";

type PostsResponse = {
  posts: UserPost[];
  hasMore: boolean;
  nextOffset: number;
};

const removePostFromCache = (
  cachedData: unknown,
  postId: string,
): unknown => {
  if (!cachedData) {
    return cachedData;
  }

  if (Array.isArray(cachedData)) {
    return cachedData.filter((post) => (post as UserPost)._id !== postId);
  }

  if (
    typeof cachedData === "object" &&
    cachedData !== null &&
    "pages" in cachedData
  ) {
    const infiniteData = cachedData as InfiniteData<PostsResponse>;

    return {
      ...infiniteData,
      pages: infiniteData.pages.map((page) => ({
        ...page,
        posts: page.posts.filter((item) => item._id !== postId),
      })),
    };
  }

  return cachedData;
};

const useDeletePostMutation = (queryKeys: readonly (readonly unknown[])[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryKeys.forEach((queryKey) => {
        queryClient.setQueryData(queryKey, (oldData: unknown) =>
          removePostFromCache(oldData, postId),
        );

        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
};

export default useDeletePostMutation;
