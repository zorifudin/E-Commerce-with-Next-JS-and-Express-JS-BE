import { User, UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/argon";

export const RegisterService = async (body: User) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role = UserRole.Customer,
    } = body;

    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("Email already exist");
    }

    const existingPhone = await prisma.user.findFirst({
      where: { phoneNumber },
    });

    if (existingPhone) {
      throw new Error("Phone number already exist");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: pass, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
