import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
        const name = session.user.email?.split('@')[0];
        const user = {
          userid: session.user.id,
          email: session.user.email,
          name: name
        };
        dispatch(setCurrentUser(user));
        await supabase.from('user').insert(user);
      } else dispatch(setCurrentUser(null));
      if (session) {
        const response = await supabase.from('user').select().eq('userid', session?.user.id).single();
        if (response.data) {
          dispatch(setCurrentUser(response.data));
        }
      }
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
