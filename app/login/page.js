'use client';
import { useStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { setUser, user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/feed');
  }, [user]);

  const login = () => {
    const mockUser = { id: 1, name: 'John Doe' };
    setUser(mockUser);
    router.push('/feed');
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login as John Doe
      </button>
    </div>
  );
}