// @ts-nocheck
import { Request, Response } from 'express';
import { prisma } from '../../db';
import { serviceSchema } from '../../validators/admin.schema';



export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.service.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.service.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = serviceSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        const data = await prisma.service.create({ data: parsed.data as any as any });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = serviceSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        const data = await prisma.service.update({ where: { id: req.params.id }, data: parsed.data as any as any });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.service.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
