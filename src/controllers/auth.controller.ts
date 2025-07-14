import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { RegisterService } from "../services/auth/get-register.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await RegisterService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
