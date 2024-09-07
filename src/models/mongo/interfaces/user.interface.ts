import { ObjectId, Document } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    products?: ObjectId[];
}

export default IUser;
