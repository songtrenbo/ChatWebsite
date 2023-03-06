import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export const tokenChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded = jwt.verify(
      bearerToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );
  } catch (err: any) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
