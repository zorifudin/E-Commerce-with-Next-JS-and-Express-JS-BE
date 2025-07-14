import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { comparePassword } from "../../lib/argon";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

interface Body extends Pick<User, "email" | "password"> {}

export const LoginService = async (body: Body) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const { password: pass, ...userWithoutPassword } = user;

    const token = sign({ id: user.id }, JWT_SECRET!, { expiresIn: "2h" });

    return { ...userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};
