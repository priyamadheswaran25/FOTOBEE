const fs = require('fs');
const path = require('path');

const models = [
  'category', 'service', 'package', 'testimonial', 'galleryPhoto', 'inquiry'
];
const modelToPrisma = {
  category: 'category',
  service: 'service',
  package: 'package',
  testimonial: 'testimonial',
  galleryPhoto: 'galleryPhoto',
  inquiry: 'inquiry'
};

const routeBase = {
  category: 'categories',
  service: 'services',
  package: 'packages',
  testimonial: 'testimonials',
  galleryPhoto: 'gallery',
  inquiry: 'inquiries'
};

models.forEach(m => {
  const pName = modelToPrisma[m];
  const rName = routeBase[m];
  const Controller = `
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await prisma.${pName}.findMany();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.${pName}.findUnique({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Not found' } });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to fetch' } });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const data = await prisma.${pName}.create({ data: req.body });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to create' } });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const data = await prisma.${pName}.update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to update' } });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await prisma.${pName}.delete({ where: { id: req.params.id } });
        res.json({ success: true, data: null });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Failed to delete' } });
    }
};
  `;
  
  const Route = `
import { Router } from 'express';
import * as controller from '../../controllers/admin/${m}.controller';
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
  
  fs.writeFileSync(path.join(__dirname, 'src/controllers/admin', m + '.controller.ts'), Controller.trim() + '\\n');
  fs.writeFileSync(path.join(__dirname, 'src/routes/admin', m + '.routes.ts'), Route.trim() + '\\n');
});

console.log('Done');
