import { Request, Response } from 'express';
import userService from '../services/user.service';

const register =  async (req: Request, res: Response) => {
    const user = await userService.createUser();
    res.status(200).send(user);
};

export default {
    register
};