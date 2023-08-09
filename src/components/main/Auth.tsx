import supabase from '../../lib/client';

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    alert('로그아웃 되었습니다.');
  } catch (error) {
    alert('로그아웃 실패');
  }
};
