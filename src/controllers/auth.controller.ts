import { userService } from '@services'
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const register = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
};

const login = async (req: Request, res: Response) => {
    // const { email, password } = req.body;
    // const user = await authService.loginUserWithEmailAndPassword(email, password);
    // const token = tokenService.generateAuthToken(user);
    // res.send({ user, token });
};

export default {
    register,
    login,
};