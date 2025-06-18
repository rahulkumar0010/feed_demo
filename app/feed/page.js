'use client';
import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useStore } from '../../store/useStore';
import PostCard from './PostCard';
import PostForm from '../../components/PostForm';
import axios from 'axios';

export default function FeedPage() {
  const queryClient = useQueryClient();
  const { user } = useStore();

  const { data: profile } = useQuery({
    enabled:false,
    queryKey: ['profile'],
    queryFn: () => axios.get('http://localhost:4000/auth').then(res => res.data),
    retry: 2
  });

  const {
    data,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => axios.get(`http://localhost:4000/posts?page=${pageParam}`).then(res => res.data),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    // enabled: !!profile,
    staleTime: 1000 * 60 * 5,
  });

  const addPostMutation = useMutation({
    mutationFn: (newPost) => axios.post('http://localhost:4000/posts', newPost),
    onSuccess: () => queryClient.invalidateQueries(['posts'])
  });
console.log("Data :", data)
  return (
    <div className="p-4">
      <PostForm onSubmit={(data) => addPostMutation.mutate(data)} />
      <div >
        {data?.pages.map((page, i) => (
          <div key={i}>
            {page?.posts?.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}
        {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
      </div>
    </div>
  );
}
