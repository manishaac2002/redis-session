import express from 'express';
import { login, resolveSession } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/resolve-session', resolveSession);

export default router;
