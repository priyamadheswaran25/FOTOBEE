import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts' } } });

router.post('/login', loginLimiter, login);
export default router;
