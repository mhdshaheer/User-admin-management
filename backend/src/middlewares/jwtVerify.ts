import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface AuthRequest extends Request {
  user?: { email: string; isAdmin: boolean };
}
interface DecodedToken extends JwtPayload {
  email: string;
  isAdmin: boolean;
}

export const verifyJwtToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized - No token provided" });
    return;
  }
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
    return;
  }
};

export const adminCheck = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: "Access denied - Admins only" });
    return;
  }
  next();
};
