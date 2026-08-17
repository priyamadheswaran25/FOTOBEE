// @ts-nocheck
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../db';
import { portfolioSchema } from '../../validators/admin.schema';



export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.portfolio.findMany({
            orderBy: { order_index: 'asc' },
        });
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.portfolio.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = portfolioSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        const data = await prisma.portfolio.create({ data: parsed.data });
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = portfolioSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        const data = await prisma.portfolio.update({ where: { id: req.params.id }, data: parsed.data });
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.portfolio.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        next(error);
    }
};
