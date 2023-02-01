declare const roles: readonly ['admin', 'user'];

export type IRole = typeof roles[number];

export type IUser = {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: IRole;
    password?: string;
}