export interface userType {
  id: string;
  email: string;
  password: string;
}

export interface PostType {
  id: string;
  userid: string;
  name: string;
  date: string;
  category: string;
  title: string;
  body: string;
  tag: string[];
  isDeleted: boolean;
}
