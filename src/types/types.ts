export interface UserType {
  userid: string;
  email: string;
  name: string;
}

export interface ToTalDataType {
  posts: PostType[];
  page: number;
  total_pages: number;
  total_results: number | null;
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
  postid: string;
  userid: string;
  commentid: string;
  name: string;
  date: string;
  text: string;
}

export interface ChatBotState {
  chatBotIsActive: boolean;
}

export interface ChatLogType {
  id: string;
  role: string;
  chat: string;
}

export interface BotChatLogsType {
  logs: ChatLogType[];
}
