'use client';
import { useStore } from '../store/useStore';
import Link from 'next/link';

export default function Navbar() {
  const { user, setUser } = useStore();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/feed" className="font-bold">SocialApp</Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button onClick={() => setUser(null)}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
