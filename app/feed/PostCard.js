"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PostCard({ post }) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId) => axios.post(`${BASE_URL}/posts/${postId}/like`),

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
    likeMutation.mutate(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <Image
          src={
            post.avatar ||
            "https://toppng.b-cdn.net/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png"
          }
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{post.author||"Rahul"}</h3>
          <p className="text-xs text-gray-500">
            {post.timestamp || "Just now"}
          </p>
        </div>
      </div>

      <div className="mb-3 relative w-full h-[300px]">
        <Image
          src={
            post.image ||
            "https://www.hitachimoneyspotatm.com/wp-content/uploads/2024/01/Article_1_f946e17f-14ef-4856-8f11-6d6670e7492e.webp"
          }
          alt="Post image"
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      <p className="text-gray-700 mt-3 mb-1">{post.content}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-600 border-t border-gray-100">
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          <span>❤️</span>
          <span>{post.likes}</span>
        </button>
        <button className="hover:text-blue-600">💬 Comment</button>
      </div>
    </div>
  );
}
