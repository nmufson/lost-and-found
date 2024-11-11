import * as mainController from '../controllers/mainController';
import * as photoController from '../controllers/photoController';

import { Router } from 'express';

const router = Router();

router.get('/', mainController.getHomePage);

router.get('/photo/:photoId', photoController.getPhotoById);
router.get('/photo/:photoId/scores', photoController.getScoresByPhotoId);

export default router;
