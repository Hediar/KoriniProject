export interface UserType {
  userid: string;
  email: string;
  name: string;
}

export interface PostType {
  postid: string;
  userid: string;
  name: string;
  date: string;
  category: string;
  title: string;
  body: string;
  tags: string[];
}

export interface Comment {
  id: number;
  nickname: string;
  date: number;
  text: string;
}
