const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const permissions = new Map(Object.entries(allRoles));

export { roles, permissions };