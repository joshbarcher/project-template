import { Router } from 'express';
import { handler } from '../controllers/default.controller.js';

const router = Router();

//define routes
router.get("/hello", handler);

export default router;