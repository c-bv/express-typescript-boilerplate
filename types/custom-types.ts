declare const roles: readonly ['admin', 'user'];

export type IRole = typeof roles[number];

export type IUser = {
    id?: any;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: IRole;
};

export interface IRequest extends Request {
    user?: any;
};