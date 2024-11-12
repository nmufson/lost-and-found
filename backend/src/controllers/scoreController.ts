import * as photoServices from '../services/photoServices';
import * as scoreServices from '../services/scoreServices';

export async function newScore(req, res) {
  // add validation
  // use library to prevent curse words?

  const { username, time, photoId } = req.body;

  const newScore = await scoreServices.newScore(username, time, photoId);

  res.status(201).json({ message: 'Score recorded successfully', newScore });
}
