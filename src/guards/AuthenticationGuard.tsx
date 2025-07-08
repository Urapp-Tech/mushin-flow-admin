import { useUserStore } from '@/stores/user.store';
import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

function AuthenticationGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [navigate, user]);

  if (!user) {
    return <div>loading ...</div>;
  }

  return children;
}

export default AuthenticationGuard;
