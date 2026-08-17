// @ts-nocheck
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { prisma } from './db';


import { z } from 'zod';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin/index';
import path from 'path';






const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);

const router = express.Router();

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/services', async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order_index: 'asc' }
    });
    res.json(services);
  } catch (err) {
    next(err);
  }
});

router.get('/packages', async (req, res, next) => {
  try {
    const packages = await prisma.package.findMany({
      include: {
        features: {
          orderBy: { order_index: 'asc' }
        }
      },
      orderBy: { order_index: 'asc' }
    });
    res.json(packages);
  } catch (err) {
    next(err);
  }
});

router.get('/stories', async (req, res, next) => {
  try {
    const stories = await prisma.story.findMany({
      include: { category: true },
      orderBy: { event_date: 'desc' }
    });
    res.json(stories);
  } catch (err) {
    next(err);
  }
});

router.get('/stories/:slug', async (req, res, next) => {
  try {
    const story = await prisma.story.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        sections: {
          include: {
            images: {
              orderBy: { order_index: 'asc' }
            }
          },
          orderBy: { order_index: 'asc' }
        },
        relatedFrom: {
          include: { relatedStory: { include: { category: true } } }
        }
      }
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const mappedSections = story.sections.map(sec => ({
      id: sec.id,
      title_en: sec.title_en,
      title_ta: sec.title_ta,
      description_en: sec.description_en,
      description_ta: sec.description_ta,
      type: sec.layout_type === 'FULL_WIDTH' ? 'full-width' : sec.layout_type === 'SIDE_BY_SIDE' ? 'side-by-side' : 'landscape-text',
      images: sec.images.map(img => img.image_path),
      captions_en: sec.images.map(img => img.caption_en),
      captions_ta: sec.images.map(img => img.caption_ta),
    }));

    const mappedRelatedSlugs = story.relatedFrom.map(r => r.relatedStory.slug);

    const response = {
      ...story,
      sections: mappedSections,
      relatedSlugs: mappedRelatedSlugs
    };
    // Clean up relations from response to keep it identical to what frontend expects mostly
    delete (response as any).relatedFrom;

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany();
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
});

router.get('/portfolios', async (req, res, next) => {
  try {
    const gallery = await prisma.portfolio.findMany({
      include: { category: true },
      orderBy: { order_index: 'asc' }
    });
    res.json(gallery);
  } catch (err) {
    next(err);
  }
});

router.get('/config', async (req, res, next) => {
  try {
    const siteConfig = await prisma.siteConfig.findUnique({ where: { id: 'global' } });
    const stats = await prisma.siteStat.findMany({ orderBy: { order_index: 'asc' } });
    res.json({ ...siteConfig, stats });
  } catch (err) {
    next(err);
  }
});

const inquirySchema = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  event_type: z.string().min(1),
  event_date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)),
  location: z.string().min(1),
  budget_range: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  package_id: z.string().uuid().nullable().optional(),
});

router.post('/inquiries', async (req, res, next) => {
  try {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation failed', details: parsed.error });
    }

    const data = parsed.data;
    
    if (data.package_id) {
      const pkg = await prisma.package.findUnique({ where: { id: data.package_id } });
      if (!pkg) {
        return res.status(400).json({ error: 'Invalid package_id' });
      }
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        event_type: data.event_type,
        event_date: new Date(data.event_date),
        location: data.location,
        budget_range: data.budget_range,
        message: data.message,
        package_id: data.package_id,
        status: 'New'
      }
    });

    res.status(201).json(inquiry);
  } catch (err) {
    next(err);
  }
});

app.use('/api/v1', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', message: err.message, stack: err.stack });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT as number, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
