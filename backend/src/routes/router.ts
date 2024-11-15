import * as mainController from '../controllers/mainController';
import * as photoController from '../controllers/photoController';
import * as scoreController from '../controllers/scoreController';
import userNameValidation from '../utils/validators.ts';

import { Router } from 'express';

const router = Router();

router.get('/', photoController.getPhotos);
router.get('/photo/slug/:slug', photoController.getPhotoBySlug);
router.post(
  '/photo/:photoId/score',
  userNameValidation(),
  scoreController.newScore,
);

export default router;
