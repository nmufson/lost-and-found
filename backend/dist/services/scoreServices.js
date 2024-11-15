import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function newScore(username, time, photoId, date) {
    return await prisma.score.create({
        data: { username, time, photoId, date: date || undefined },
    });
}
export async function getScores(photoId) {
    return await prisma.score.findMany({
        where: { photoId },
        orderBy: {
            time: 'asc',
        },
    });
}
