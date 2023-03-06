import { getAllConversation, newConversation, getConversationTwoPpl } from "../services/conversation.service";
import { IConversation } from "../models/conversation.model";
import { NextFunction, Request, Response } from "express";

export const GetAllConversation = async(req: Request, res:Response, next: NextFunction) =>{
    try{
        const userId = req.params.userId;
        let conversations = await getAllConversation(userId);
        if(conversations){
            return res.status(200).json(conversations);
        } 
        return res.status(400).json("Invalid userId");
    }
    catch(err){
        return res.status(500).json(err);
    }
}

export const NewConversation = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const data = req.body;
        let conversation = await newConversation(data.senderId, data.receiverId);
        if(conversation){
            return res.status(200).json(conversation);
        }
        return res.status(400).json("Invalid data input");
    }
    catch(err){
        return res.status(500).json(err);
    }
}

export const GetConversationTwoPpl = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const firstUserId = req.params.firstUserId;
        const secondUserId = req.params.secondUserId;
        const conversation = await getConversationTwoPpl(firstUserId, secondUserId);
        if(conversation){
            return res.status(200).json(conversation);
        }
        return res.status(400).json("Invalid id");
    }
    catch(err){
        return res.status(500).json(err);
    }
}