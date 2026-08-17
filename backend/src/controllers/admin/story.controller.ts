// @ts-nocheck
import { Request, Response } from 'express';
import { prisma } from '../../db';
import { storySchema } from '../../validators/admin.schema';



export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.story.findMany({
            include: { sections: { include: { images: true } }, relatedFrom: true, relatedTo: true }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.story.findUnique({
            where: { id: req.params.id },
            include: { sections: { include: { images: true } }, relatedFrom: true, relatedTo: true }
        });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = storySchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        
        const { sections, related_story_ids, ...storyData } = parsed.data;
        const data = await prisma.story.create({
            data: {
                ...storyData,
                sections: sections ? {
                    create: sections.map(sec => ({
                        ...sec,
                        images: sec.images ? { create: sec.images } : undefined
                    }))
                } : undefined,
                relatedFrom: related_story_ids ? {
                    create: related_story_ids.map(id => ({ related_story_id: id }))
                } : undefined
            },
            include: { sections: { include: { images: true } } }
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = storySchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error } });
        
        const { sections, related_story_ids, ...storyData } = parsed.data;
        const data = await prisma.$transaction(async (tx) => {
            if (sections) {
                await tx.storySection.deleteMany({ where: { story_id: req.params.id } });
            }
            if (related_story_ids) {
                await tx.storyRelated.deleteMany({ where: { story_id: req.params.id } });
            }
            return tx.story.update({
                where: { id: req.params.id },
                data: {
                    ...storyData,
                    sections: sections ? {
                        create: sections.map(sec => ({
                            ...sec,
                            images: sec.images ? { create: sec.images } : undefined
                        }))
                    } : undefined,
                    relatedFrom: related_story_ids ? {
                        create: related_story_ids.map(id => ({ related_story_id: id }))
                    } : undefined
                },
                include: { sections: { include: { images: true } } }
            });
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.story.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
