"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotoPreviews = getPhotoPreviews;
exports.getPhotoById = getPhotoById;
exports.getPhotoWithScoresById = getPhotoWithScoresById;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function getPhotoPreviews() {
    return await prisma.photo.findMany({
        select: {
            id: true,
            name: true,
            image: true,
        },
    });
}
async function getPhotoById(photoId) {
    return await prisma.photo.findUnique({
        where: { id: photoId },
        select: {
            name: true,
            image: true,
        },
        include: {
            characters: true,
        },
    });
}
async function getPhotoWithScoresById(photoId) {
    return await prisma.photo.findUnique({
        where: { id: photoId },
        select: {
            name: true,
            image: true,
            scores: true,
        },
    });
}
