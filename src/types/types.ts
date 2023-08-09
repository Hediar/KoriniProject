export interface UserType {
  id: string;
  email: string;
  password: string;
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
  postid: string;
  id: number;
  nickname: string;
  date: number;
  text: string;
}
