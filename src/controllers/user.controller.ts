import { IRequest } from '@/services/token.service';
import { userService } from '@services';
import ApiError from '@utils/ApiError';
import pick from '@utils/pick';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
};

const getUsers = async (req: Request, res: Response) => {
    const filter = pick(req.query, ['firstName', 'lastName', 'email']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
};

const getUser = async (req: IRequest, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    res.send(user);
};

const updateUser = async (req: IRequest, res: Response) => {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.send(user);
};

const deleteUser = async (req: IRequest, res: Response) => {
    await userService.deleteUserById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
};

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};