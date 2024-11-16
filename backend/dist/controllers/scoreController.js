import * as scoreServices from '../services/scoreServices.js';
import catchAsync from '../utils/catchAsync.js';
import { validationResult } from 'express-validator';
export const newScore = catchAsync(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, time, photoId } = req.body;
    const newScore = await scoreServices.newScore(username, time, photoId);
    res.status(201).json({ message: 'Score recorded successfully', newScore });
});
