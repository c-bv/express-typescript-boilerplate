declare const roles: readonly ['admin', 'user'];

export type Role = typeof roles[number];

export type User = {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string;
}