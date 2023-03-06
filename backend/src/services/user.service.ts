import { IUser, User } from "../models/user.model";
import { default as bcrypt } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import jwt_decode from 'jwt-decode';
import multer from 'multer';
dotenv.config();

//Register
export const userRegister = async (user: IUser) => {
  let checkUserEmail = await User.findOne({email: user.email});
  if(checkUserEmail){
    return null;
  }
  let hashPassword = await hashUserPassword(user.password);
  let userData = await User.create({
    email: user.email,
    name: user.name,
    password: hashPassword,
    profilePicture: user.profilePicture,
  });
  return userData;
};

//Hash Password
const hashUserPassword = async (password: string) => {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//Login
export const userLogin = async (email: string, password: string) => {
  let userData = await User.findOne({ email: email });
  if (userData && bcrypt.compareSync(password, userData.password) === true) {
    const data = {
      userId: userData._id,
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture,
    };

    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY!, {
      expiresIn: 300,
    });

    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_PRIVATE_KEY!, {
      expiresIn: "24h",
    });
    await User.findByIdAndUpdate(userData._id, {
      refreshToken: refreshToken,
    });
    const response = {
      token: token,
    };
    return response;
  } else {
    return null;
  }
};

export const refreshToken = async (userId: string) => {
  const userData = await User.findOne({ _id: userId });
  if (userData) {
    const refreshToken: any = jwt_decode(userData.refreshToken);
    if(refreshToken && Math.floor(new Date().getTime() / 1000) >= refreshToken.exp){
      await User.findByIdAndUpdate(userId,{
        refreshToken: ''
      });
      return null;
    }
    const data = {
      userId: userData._id,
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture,
    };
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY!, {
      expiresIn: "2h",
    });
    const response = {
      token: token,
    };
    return response;
  } else {
    return null;
  }
};

export const getUserData = async (userId: string) => {
  const userData = await User.findOne({ _id: userId });
  if (userData) {
    const data = {
      userId: userData._id,
      profilePicture: userData.profilePicture,
      name: userData.name,
    };
    return data;
  }
  return null;
};

export const searchUser = async (searchString: string) => {
  const users = await User.find({
    name: { $regex: searchString, $options: "i" },
  });

  if (users) return users;
  return null;
};

export const updateUserProfile = async () =>{
  
}
