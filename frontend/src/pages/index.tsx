import { useEffect } from 'react';
import { useRouter } from 'next/router';
import  useAuthStore  from '../stores/authStore';
import Predictor from '../components/Predictor';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <Predictor />
    </div>
  );
}