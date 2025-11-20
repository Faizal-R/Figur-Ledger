import { Request, Response, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export interface AuthRequest extends Request {
  user?: any;
}

export const verifyAuthToken =  (req: AuthRequest, res: Response, next: NextFunction) => {
   try {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Verifying token:", token);
 if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  if (!decoded) return res.status(401).json({ message: "Invalid Token" });

  req.user = decoded;
  next();
} catch (error) {
  return res.status(401).json({ message: "Invalid Token" });
}
};
