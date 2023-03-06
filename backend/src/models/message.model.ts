import { Schema, model, Types } from "mongoose";


export interface IMessage{
  conversationId: String;
  sender: string;
  text: string;
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId:{
        type: Types.ObjectId,
        ref: 'conversations'
    },
    sender:{
        type: String
    },
    text:{
        type: String
    }
  },
  { timestamps: true }
);
export const Message = model<IMessage>("messages", messageSchema);

