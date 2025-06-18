"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function PostCard({ post }) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId) =>
      axios.post(`http://localhost:4000/posts/${postId}/like`),

    onMutate: async (postId) => {
      await queryClient.cancelQueries(["posts"]);
      const previousData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old) => {
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) =>
              p.id === postId ? { ...p, likes: p.likes + 1 } : p
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      console.error("Error liking post:", err);
      queryClient.setQueryData(["posts"], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const likePost = (id) => {
    console.log("POst id", id);
    likeMutation.mutate(id);
  };
  return (
    <div className="border p-4 my-2 rounded shadow">
      <h3 className="font-bold">{post.author}</h3>
      <p>{post.content}</p>
      <button onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
    </div>
  );
}
