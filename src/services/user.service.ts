import { IUserDocument } from '@/models/user.model';
import { IUser } from '@custom-types/custom-types';
import User from '@/models/user.model';
import ApiError from '@utils/ApiError';
import httpStatus from 'http-status';

const createUser = async (userData: IUser) => {
    if (await User.isEmailTaken(userData.email as string)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userData);
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
};

const queryUsers = async (filter: object, options: object): Promise<IUser[]> => {
    return await User.find(filter, null, options);
};

const getUserById = async (id: string): Promise<IUserDocument | null> => {
    return await User.findById(id);
};

const updateUserById = async (id: string, updateBody: IUser): Promise<IUserDocument | null> => {
    const user = await getUserById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (id: string): Promise<void> => {
    const user = await getUserById(id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return;
};

export default {
    createUser,
    getUserById,
    getUserByEmail,
    queryUsers,
    updateUserById,
    deleteUserById
};