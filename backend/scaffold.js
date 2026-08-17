const fs = require('fs');
const path = require('path');

const write = (p, content) => {
    fs.writeFileSync(path.join(__dirname, p), content.trim() + '\n', 'utf8');
};

// 1. Auth Middleware
write('src/middleware/auth.middleware.ts', `
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
        (req as any).adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Expired or invalid token' } });
    }
};
`);

// 2. Auth Controller
write('src/controllers/auth.controller.ts', `
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } });
            return;
        }

        const admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin || !admin.is_active) {
            res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials or inactive account' } });
            return;
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid credentials or inactive account' } });
            return;
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

        res.json({
            success: true,
            data: {
                token,
                admin: { id: admin.id, email: admin.email, is_active: admin.is_active }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'An unexpected error occurred' } });
    }
};
`);

// 3. Auth Routes
write('src/routes/auth.routes.ts', `
import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts' } } });

router.post('/login', loginLimiter, login);
export default router;
`);

// 4. Admin Base Routes
write('src/routes/admin/index.ts', `
import { Router } from 'express';
import categoryRoutes from './category.routes';
// import other routes...

const router = Router();
router.use('/categories', categoryRoutes);
// router.use('/services', serviceRoutes);
export default router;
`);

console.log('Scaffolding generated successfully.');
