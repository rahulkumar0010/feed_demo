'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function CommentList({ postId }) {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');

  const { data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => axios.get(`http://localhost:4000/posts/${postId}/comments`).then(res => res.data),
  });

  const commentMutation = useMutation({
    mutationFn: (newComment) => axios.post(`http://localhost:4000/posts/${postId}/comments`, newComment),
    onSuccess: () => queryClient.invalidateQueries(['comments', postId])
  });

  const handleAdd = () => {
    commentMutation.mutate({ text });
    setText('');
  };

  return (
    <div className="mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-1 w-full"
        placeholder="Add a comment"
      />
      <button onClick={handleAdd} className="text-sm text-blue-500">Comment</button>
      <ul className="text-sm mt-2">
        {data?.map(c => (
          <li key={c.id} className="border-b py-1">{c.text}</li>
        ))}
      </ul>
    </div>
  );
}
