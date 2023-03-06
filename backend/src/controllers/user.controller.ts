import { userRegister, userLogin, refreshToken,  getUserData, searchUser } from "../services/user.service";
import { IUser, User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

import fs from 'fs';
import path from 'path';

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    let user = await userRegister(userData);
    if (user) {
      return res.status(200).json("Account created successfully");
    }
    return res.status(400).json("Invalid request");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData: IUser = req.body;
    let user = await userLogin(userData.email, userData.password);
    if (user) {
      return res.status(201).json(user);
    }
    return res.status(401).json("Invalid request");
  } catch (err) {
    return res.status(500).json(err);
  }
};


export const RefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const userId: string = req.params.userId;
    let tokenRefresh = await refreshToken(userId);
    if(tokenRefresh){
      return res.status(200).json(tokenRefresh);
    }
    return res.status(400).json("Invalid refreshToken");
  } catch(err){
    return res.status(500).json(err);
  }
}

export const GetUserData = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const userId: string = req.params.userId;
    let userData = await getUserData(userId);
    if(userData){
      return res.status(200).json(userData);
    }
    res.status(400).json("Invalid userId");
  }
  catch(err){
    return res.status(500).json(err);
  }
}

export const SearchUser = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const searchString: string = req.params.searchString;
    let users = await searchUser(searchString);
    if(users){
      return res.status(200).json(users);
    }
    res.status(400).json("Invalid search string");
  }
  catch(err){
    return res.status(500).json(err);
  }
}

export const updateUserProfile = async(req: Request, res: Response, next: NextFunction)=>{
  const file = req.file;
  const userId = req.body;
  console.log("this is file ", file);
  if(!file){
    const error:any = new Error('No file');
    error.httpStatusCode = 400;
    return next(error);
  }
  const paths = fs.readFileSync(path.join(__dirname+"../../../uploads/"+file.filename))
  console.log(paths);
  let checkUserEmail = await User.findByIdAndUpdate("62d8b879cc78690cc4b168b3", {profilePicture: paths});

  res.send(file);
}