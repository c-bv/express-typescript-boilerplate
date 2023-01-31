import userController from '@/controllers/user.controller';
import asyncRouter from '@utils/asyncRouter';
import express from 'express';

const router = asyncRouter(express.Router());

router.route('/')
    // .get(userController.getUsers)
    // .post(userController.createUser)
    // .put(userController.updateUser)
    // .delete(userController.deleteUser);

export default router;