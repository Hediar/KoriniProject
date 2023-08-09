import supabase from "../lib/client";

const updateUserNickname = async (userId: string, nickname: string) => {
  await supabase.from('user').update({ name: nickname }).eq('userid', userId)
};

export default updateUserNickname;