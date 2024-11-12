import * as mainController from '../controllers/mainController';
import * as photoController from '../controllers/photoController';
import * as scoreController from '../controllers/scoreController';

import { Router } from 'express';

const router = Router();

router.get('/', mainController.getHomePage);

router.get('/photo/id/:photoId', photoController.getPhotoById);
router.get('/photo/slug/:slug', photoController.getPhotoBySlug);
router.get('/photo/:photoId/scores', photoController.getScoresByPhotoId);

router.post('/photo/:photoId/score', scoreController.newScore);

export default router;
