import express from 'express';
import { GetAllMessage, NewMessage } from '../controllers/message.controller';
import { tokenChecker } from '../middlewares/tokenChecker';

const router = express.Router();

router.get('/:conversationId/limit=:limit', tokenChecker, GetAllMessage);

router.post('/', tokenChecker, NewMessage);

export default router;