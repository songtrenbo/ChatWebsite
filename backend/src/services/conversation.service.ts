import { Conversation } from "../models/conversation.model";

export const getAllConversation = async (userId: string) => {
  let conversations = await Conversation.find({ members: { $in: [userId] } });
  return conversations;
};

export const getConversationTwoPpl = async (
  firstUserId: string,
  secondUserId: string
) => {
  let conversation = await Conversation.findOne({
    members: { $all: [firstUserId, secondUserId] },
  });
  return conversation;
};

export const newConversation = async (senderId: string, receiverId: string) => {
  let conversation = await Conversation.create({
    members: [senderId, receiverId],
  });
  return conversation;
};
















// export class ConservationService {
//   private conversations: IConversation[];
//   private conversation: IConversation | null;

//   constructor(conversations: IConversation[], conversation: IConversation) {
//     this.conversations = conversations;
//     this.conversation = conversation;
//   }

//   async getConversationTwoPpl(firstUserId: String, secondUserId: String) {
//     this.conversation = await Conversation.findOne({
//       members: { $all: [firstUserId, secondUserId] },
//     });
//     return this.conversation;
//   }

//   async getConversations(userId: String) {
//     this.conversations = await Conversation.find({
//       members: { $in: [userId] },
//     });
//     return this.conversations;
//   }

//   async newConversation(senderId: String, receiverId: String) {
//     this.conversation = await Conversation.create({
//       members: [senderId, receiverId],
//     });
//   }
// }
