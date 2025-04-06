import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuth.js';
import { createFeedback, getAllFeedback, updateFeedback, deleteFeedback } from '../Controllers/FeedbackController.js';

const router = express.Router();

router.post('/create', ensureAuthenticated, createFeedback);
router.get('/all', getAllFeedback);
router.put('/update/:id', ensureAuthenticated, updateFeedback);
router.delete('/delete/:id', ensureAuthenticated, deleteFeedback);
router.delete('/admindelete/:id', deleteFeedback);

export default router;
