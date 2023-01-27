import express from 'express';
import AuthController from '../../controllers/auth.controller';
import asyncRouter from '../../utils/asyncRouter';

const router = asyncRouter(express.Router());

router.get('/register', AuthController.register);

export default router;