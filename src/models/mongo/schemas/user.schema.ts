import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import IUser from "../interfaces/user.interface";
import envConfig from "../../../config/env/env.config";

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }  
}, { timestamps: true, collection: 'users' });

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(envConfig.saltRounds);

        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error as Error);
    }
});


const User = model<IUser>('User', userSchema);

export default User;