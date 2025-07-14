import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { RegisterService } from "../services/auth/register.service";
import { LoginService } from "../services/auth/login.service";

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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await LoginService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
