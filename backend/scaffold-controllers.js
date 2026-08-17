const fs = require('fs');
const path = require('path');

const write = (p, content) => {
    fs.writeFileSync(path.join(__dirname, p), content.trim() + '\n', 'utf8');
};

const controllers = {
  category: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { categorySchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.category.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.category.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = categorySchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.category.create({ data: parsed.data });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = categorySchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.category.update({ where: { id: req.params.id }, data: parsed.data });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.category.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `,
  package: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { packageSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.package.findMany({ include: { features: true } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.package.findUnique({ where: { id: req.params.id }, include: { features: true } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = packageSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        
        const { features, ...packageData } = parsed.data;
        const data = await prisma.package.create({
            data: {
                ...packageData,
                features: features ? { create: features } : undefined
            },
            include: { features: true }
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = packageSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        
        const { features, ...packageData } = parsed.data;
        const data = await prisma.$transaction(async (tx) => {
            if (features) {
                await tx.packageFeature.deleteMany({ where: { package_id: req.params.id } });
            }
            return tx.package.update({
                where: { id: req.params.id },
                data: {
                    ...packageData,
                    features: features ? { create: features } : undefined
                },
                include: { features: true }
            });
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.package.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `,
  story: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { storySchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.story.findMany({
            include: { sections: { include: { images: true } }, relatedFrom: true, relatedTo: true }
        });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
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
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        
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
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        
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
  `,
  service: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { serviceSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.service.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
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
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.service.create({ data: parsed.data });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = serviceSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.service.update({ where: { id: req.params.id }, data: parsed.data });
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
  `,
  testimonial: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { testimonialSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.testimonial.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.testimonial.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = testimonialSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.testimonial.create({ data: parsed.data });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = testimonialSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.testimonial.update({ where: { id: req.params.id }, data: parsed.data });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.testimonial.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `,
  gallery: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { galleryPhotoSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.galleryPhoto.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.galleryPhoto.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const parsed = galleryPhotoSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.galleryPhoto.create({ data: parsed.data });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = galleryPhotoSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.galleryPhoto.update({ where: { id: req.params.id }, data: parsed.data });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.galleryPhoto.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `,
  inquiry: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { inquiryStatusUpdateSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.inquiry.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = inquiryStatusUpdateSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
        const data = await prisma.inquiry.update({ where: { id: req.params.id }, data: parsed.data });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.inquiry.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `,
  config: `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { siteConfigSchema } from '../../validators/admin.schema';

const prisma = new PrismaClient();

export const get = async (req: Request, res: Response) => {
    try {
        const data = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const parsed = siteConfigSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid data', details: parsed.error.errors } });
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
  `
};

const makeRoute = (name) => {
    if (name === 'config') {
        return `
import { Router } from 'express';
import * as controller from '../../controllers/admin/config.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', controller.get);
router.put('/', controller.update);

export default router;
        `;
    }
    if (name === 'inquiry') {
        return `
import { Router } from 'express';
import * as controller from '../../controllers/admin/inquiry.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
        `;
    }
    return `
import { Router } from 'express';
import * as controller from '../../controllers/admin/${name}.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
    `;
};

for (const [name, content] of Object.entries(controllers)) {
    write('src/controllers/admin/' + name + '.controller.ts', content);
    write('src/routes/admin/' + name + '.routes.ts', makeRoute(name));
}

write('src/routes/admin/index.ts', `
import { Router } from 'express';
import categoryRoutes from './category.routes';
import serviceRoutes from './service.routes';
import packageRoutes from './package.routes';
import storyRoutes from './story.routes';
import testimonialRoutes from './testimonial.routes';
import galleryRoutes from './gallery.routes';
import inquiryRoutes from './inquiry.routes';
import configRoutes from './config.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/packages', packageRoutes);
router.use('/stories', storyRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/gallery', galleryRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/config', configRoutes);
router.use('/upload', uploadRoutes);

export default router;
`);

console.log('Controllers generated');
