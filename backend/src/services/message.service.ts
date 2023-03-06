import { IMessage, Message } from "../models/message.model";
import { User } from "../models/user.model";

export const getAllMessage = async (conversationId: string, limit: number) => {
  const messageData = await Message.find({ conversationId: conversationId }).limit(limit).sort({$natural: -1});
  return messageData.reverse();
};

export const newMessage = async (message: IMessage) => {
  let user = await User.findOne({ _id: message.sender });
  if (user) {
    const messageData = await Message.create(message);
    return messageData;
  }
};
