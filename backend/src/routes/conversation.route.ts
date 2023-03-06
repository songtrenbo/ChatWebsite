import express from 'express';
import { GetAllConversation, NewConversation, GetConversationTwoPpl } from '../controllers/conversation.controller';
import { tokenChecker } from '../middlewares/tokenChecker';
const router = express.Router();

router.post('/', tokenChecker, NewConversation);

router.get('/:userId', tokenChecker, GetAllConversation);

router.get('/find/:firstUserId/:secondUserId', tokenChecker, GetConversationTwoPpl);

export = router;