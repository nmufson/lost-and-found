import * as photoServices from '../services/photoServices';
import * as scoreServices from '../services/scoreServices';

export async function newScore(req, res) {
  console.log('ya dig');
  // add validation
  // use library to prevent curse words?

  const { username, time, photoId } = req.body;

  const newScore = await scoreServices.newScore(username, time, photoId);

  res.status(201).json({ message: 'Score recorded successfully', newScore });
}

export async function getScoresByPhotoId(req, res) {
  const { photoId } = req.body;

  const scores = await scoreServices.getScoresByPhotoId(photoId);
  if (!scores) {
    return res.status(404).json({ error: 'Scores not found' });
  }

  return res
    .status(200)
    .json({ message: 'Scores retrieved successfully.', scores });
}
