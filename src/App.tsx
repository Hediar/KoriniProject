import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from './lib/client';
import { setCurrentUser } from './redux/module/userSlice';
import { useAppSelector } from './hooks';
import { RootState } from './redux/config/configStore';

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const response = await supabase.from('user').select().eq('userid', session?.user.id).single();
        dispatch(setCurrentUser(response.data));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
