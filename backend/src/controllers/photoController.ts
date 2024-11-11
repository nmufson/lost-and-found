import { Request, Response } from 'express';
import * as photoServices from '../services/photoServices';

export async function getPhotoById(req: Request, res: Response) {
  const photoId = parseInt(req.params.photoId, 10);
  const photo = await photoServices.getPhotoById(photoId);

  if (!photo) {
    return res.status(404).json({ message: 'Photo not found' });
  }

  res.status(200).json({ message: 'Photo found successfully', photo });
}

export async function getScoresByPhotoId(req: Request, res: Response) {
  const photoId = parseInt(req.params.photoId, 10);
  const scoreData = await photoServices.getPhotoWithScoresById(photoId);

  if (!scoreData) {
    return res.status(404).json({ message: 'Score data not found' });
  }

  res.status(200).json({ message: 'Score data found successfully', scoreData });
}
