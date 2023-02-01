import ApiError from '@/utils/ApiError';
import { IUser } from '@custom-types/custom-types';
import { UserSchema } from '@models';
import httpStatus from 'http-status';

const createUser = async (userData: IUser) => {
    if (await UserSchema.isEmailTaken(userData.email as string)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return UserSchema.create(userData);
};

export default {
    createUser,
};