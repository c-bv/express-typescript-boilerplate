import { IUser } from '@custom-types/custom-types';
import { UserSchema } from '@models';
import ApiError from '@utils/ApiError';
import httpStatus from 'http-status';

const createUser = async (userData: IUser) => {
    if (await UserSchema.isEmailTaken(userData.email as string)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return UserSchema.create(userData);
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserSchema.findOne({ email });
};

const queryUsers = async (filter: object, options: object): Promise<IUser[]> => {
    return await UserSchema.find(filter, null, options);
};

const getUserById = async (id: string): Promise<IUser | null> => {
    return await UserSchema.findById(id);
};

export default {
    createUser,
    getUserById,
    getUserByEmail,
    queryUsers,
};