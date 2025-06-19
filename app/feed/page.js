"use client";
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStore } from "../../store/useStore";
import PostCard from "./PostCard";
import PostForm from "../../components/PostForm";
import axios from "axios";
import { useRef, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { user } = useStore();
  const loadMoreRef = useRef(null);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axios.get(`${BASE_URL}/auth`).then((res) => res.data),
    enabled: false,
    retry: 2,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) =>
        axios
          .get(`${BASE_URL}/posts?page=${pageParam}`)
          .then((res) => res.data),
      getNextPageParam: (lastPage, allPages) => {
        console.log("Last page:", lastPage);
        if (!lastPage.nextPage) return undefined;
        return lastPage.nextPage;
      },
      staleTime: 1000 * 60 * 5,
      // enabled: !!profile,
    });

  const addPostMutation = useMutation({
    mutationFn: (newPost) => axios.post(`${BASE_URL}/posts`, newPost),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="p-4">
      <PostForm onSubmit={(data) => addPostMutation.mutate(data)} />
      <div>
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page?.posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}
        <div ref={loadMoreRef} className="h-10" />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
