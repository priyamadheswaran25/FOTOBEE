// @ts-nocheck
import { Request, Response } from 'express';
import { prisma } from '../../db';
import { siteConfigSchema } from '../../validators/admin.schema';



export const get = async (req: Request, res: Response) => {
    try {
        const data = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: true, data: null });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = siteConfigSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        const data = await prisma.siteConfig.upsert({
            where: { id: 'global' },
            update: parsed.data,
            create: { id: 'global', ...parsed.data }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};
