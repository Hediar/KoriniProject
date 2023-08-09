export interface UserType {
  userid: string;
  email: string;
  name: string;
}

export interface PostType {
  postid: string;
  userid: string;
  name: string;
  date: number;
  category: string;
  title: string;
  body: string;
  tag: string[];
}

export interface Comment {
  id: number;
  nickname: string;
  date: number;
  text: string;
}

export interface ChatLogType {
  id: string;
  role: string;
  chat: string;
}
