import { Request, NextFunction, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new Error("Missing token.");

    const [type, token] = authHeader.split(" ");

    if (type != "Bearer") throw new Error("Invalid token.");

    verify(
      token,
      "secret"
    ) as IPayload;

    next();
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      return response.status(401).json({ message: "Invalid token." });
    }
    return response.status(500).json({ message: error.message });
  }
}