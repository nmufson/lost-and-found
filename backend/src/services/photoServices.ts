import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPhotoPreviews() {
  return await prisma.photo.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
}

export async function getPhotos() {
  return await prisma.photo.findMany({
    include: {
      characters: true,
      scores: true,
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
