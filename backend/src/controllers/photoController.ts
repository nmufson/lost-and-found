import { Request, Response } from 'express';
import * as photoServices from '../services/photoServices';
import catchAsync from '../utils/catchAsync.ts';

export const getPhotos = catchAsync(async (req: Request, res: Response) => {
  const photos = await photoServices.getPhotos();

  if (!photos) {
    return res.status(404).json({ message: 'Photos not found' });
  }

  const data = { photos };
  res.json(data);
});

export const getPhotoById = catchAsync(async (req: Request, res: Response) => {
  const photoId = parseInt(req.params.photoId, 10);
  const photo = await photoServices.getPhotoById(photoId);

  if (!photo) {
    return res.status(404).json({ message: 'Photo not found' });
  }

  res.status(200).json({ message: 'Photo found successfully', photo });
});

export const getScoresByPhotoId = catchAsync(
  async (req: Request, res: Response) => {
    const photoId = parseInt(req.params.photoId, 10);
    const scoreData = await photoServices.getPhotoWithScoresById(photoId);

    if (!scoreData) {
      return res.status(404).json({ message: 'Score data not found' });
    }

    res
      .status(200)
      .json({ message: 'Score data found successfully', scoreData });
  },
);

export const getPhotoBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const photo = await photoServices.getPhotoBySlug(slug);

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.status(200).json({ message: 'Photo found successfully', photo });
  },
);
