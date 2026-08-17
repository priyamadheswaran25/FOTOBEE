// @ts-nocheck
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
        const secret = process.env.JWT_SECRET || 'supersecret';
        const decoded = jwt.verify(token, secret) as any;
        (req as any).adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Expired or invalid token' } });
    }
};
