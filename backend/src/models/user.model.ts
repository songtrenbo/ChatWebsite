import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  refreshToken: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    min: 3,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  profilePicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMT3-A3BoHLW3BEGarYVhSG3ha0VvGsLbHIw&usqp=CAU",
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
  refreshToken: {
    type: String,
    default: "",
  },
});

export const User = model<IUser>("users", userSchema);
