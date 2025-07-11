import { prisma } from "../../lib/prisma";

export const getSampleService = async () => {
  try {
    const samples = await prisma.sample.findMany();
    return samples;
  } catch (error) {
    throw error;
  }
};
