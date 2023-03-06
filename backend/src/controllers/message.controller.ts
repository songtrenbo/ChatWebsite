import { NextFunction, Request, Response } from "express";
import { getAllMessage, newMessage } from "../services/message.service";

export const GetAllMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let conversationId = req.params.conversationId;
    let limit = Number(req.params.limit);
    const messages = await getAllMessage(conversationId, limit);
    if (messages) {
      return res.status(200).json(messages);
    }
    return res.status(400).json("Invalid Conversation Id");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const NewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dataMessage = req.body;
    const message = await newMessage(dataMessage);
    if (message) {
      return res.status(200).json(message);
    }
    return res.status(400).json("Invalid Message");
  } catch (err) {
    return res.status(500).json(err);
  }
};
