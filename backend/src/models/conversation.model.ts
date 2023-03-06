import { Schema, model } from "mongoose";

export interface IConversation{
  members: Array<String> | undefined;
}

const conversationSchema = new Schema<IConversation>({
  members:{
    type: Array<String>, 
    ref: 'users'
  }
});
export const Conversation = model<IConversation>("conversations", conversationSchema);
