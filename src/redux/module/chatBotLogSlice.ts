import { createSlice } from "@reduxjs/toolkit";
import { ChatLogType } from "../../types/types";

export interface BotChatLogsType {
  logs: ChatLogType[];
}

const initialState: BotChatLogsType = {
  logs: [],
}

const chatBotLogSlice = createSlice({
  name: 'chatBotLog',
  initialState,
  reducers: {
    addChatLog: (state, action) => {
      state.logs.push({
        id: action.payload.id,
        role: action.payload.role,
        chat: action.payload.chat,
      });
    }
  }
});

export const { addChatLog } = chatBotLogSlice.actions;
export default chatBotLogSlice.reducer;