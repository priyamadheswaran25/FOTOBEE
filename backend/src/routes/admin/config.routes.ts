import { Router } from 'express';
import * as controller from '../../controllers/admin/config.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', controller.get);
router.put('/', controller.update);

export default router;
