import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.get('/register', AuthController.register);

export default router;