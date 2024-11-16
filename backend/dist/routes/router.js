import * as photoController from '../controllers/photoController.js';
import * as scoreController from '../controllers/scoreController.js';
import userNameValidation from '../utils/validators.js';
import { Router } from 'express';
const router = Router();
router.get('/', photoController.getPhotos);
router.get('/photo/slug/:slug', photoController.getPhotoBySlug);
router.post('/photo/:photoId/score', userNameValidation(), scoreController.newScore);
export default router;
