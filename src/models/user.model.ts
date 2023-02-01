import { IRole } from '@custom-types/custom-types';
import bcrypt from 'bcrypt';
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRole;
};

export interface IUserDocument extends IUser, Document {
    setPassword: (password: string) => Promise<void>;
    checkPassword: (password: string) => Promise<boolean>;
};

export interface IUserModel extends Model<IUserDocument> {
    isEmailTaken(email: string): Promise<boolean>;
};

const UserSchema: Schema<IUserDocument> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
            message: 'Email is not valid'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password: string) => password.length >= 6,
            message: 'Password must be at least 6 characters long'
        }
    },
    role: { type: String, enum: [] as IRole[], default: 'user' }
});

/*
    use regular function instead of arrow function because arrow function does not bind 'this'
*/
UserSchema.methods.setPassword = async function (password: string): Promise<void> {
    const salt: string = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
};

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.statics.isEmailTaken = async function (email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return !!user;
};

UserSchema.pre('save', async function (): Promise<void> {
    if (!this.isModified('password')) return;
    await this.setPassword(this.password);
});

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default User;