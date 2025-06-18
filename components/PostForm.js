'use client';
import { useState } from 'react';

export default function PostForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full border p-2 mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Post
      </button>
    </form>
  );
}
