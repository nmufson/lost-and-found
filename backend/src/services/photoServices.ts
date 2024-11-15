import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPhotos() {
  return await prisma.photo.findMany({
    include: {
      characters: true,
      scores: {
        orderBy: {
          time: 'asc',
        },
      },
    },
  });
}

export async function getPhotoById(photoId: number) {
  return await prisma.photo.findUnique({
    where: { id: photoId },
    select: {
      name: true,
      image: true,
      characters: true,
    },
  });
}

export async function getPhotoBySlug(slug: string) {
  return await prisma.photo.findUnique({
    where: { slug },
    include: {
      characters: true,
    },
  });
}

export async function getPhotoWithScoresById(photoId: number) {
  return await prisma.photo.findUnique({
    where: { id: photoId },
    select: {
      name: true,
      image: true,
      scores: true,
    },
  });
}
