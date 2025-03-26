import { Router } from 'express';
import { codeCoverage } from './../controllers/server.controller.js';

const router = Router();

router.get("/coverage", codeCoverage);

export default router;