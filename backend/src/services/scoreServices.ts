import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function newScore(
  username: string,
  time: number,
  photoId: number,
  date?: Date,
) {
  return await prisma.score.create({
    data: { username, time, photoId, date: date || undefined },
  });
}

export async function getScores(photoId: number) {
  return await prisma.score.findMany({
    where: { photoId },
    orderBy: {
      time: 'asc',
    },
  });
}
