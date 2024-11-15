import { Request, Response } from 'express';
import * as scoreServices from '../services/scoreServices';
import catchAsync from '../utils/catchAsync.ts';
import { validationResult } from 'express-validator';

export const newScore = catchAsync(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, time, photoId } = req.body;

  const newScore = await scoreServices.newScore(username, time, photoId);

  res.status(201).json({ message: 'Score recorded successfully', newScore });
});

export const getScoresByPhotoId = catchAsync(
  async (req: Request, res: Response) => {
    const { photoId } = req.body;

    const scores = await scoreServices.getScoresByPhotoId(photoId);
    if (!scores) {
      return res.status(404).json({ error: 'Scores not found' });
    }

    return res
      .status(200)
      .json({ message: 'Scores retrieved successfully.', scores });
  },
);
