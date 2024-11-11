import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function newScore(
  time: number,
  username: string,
  photoId: number,
) {
  return await prisma.score.create({
    data: { time, username, photoId },
  });
}
