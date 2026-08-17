import { Router } from 'express';
import categoryRoutes from './category.routes';
import serviceRoutes from './service.routes';
import packageRoutes from './package.routes';
import storyRoutes from './story.routes';
import testimonialRoutes from './testimonial.routes';
import portfolioRoutes from './portfolio.routes';
import inquiryRoutes from './inquiry.routes';
import configRoutes from './config.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/packages', packageRoutes);
router.use('/stories', storyRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/config', configRoutes);
router.use('/upload', uploadRoutes);

export default router;
