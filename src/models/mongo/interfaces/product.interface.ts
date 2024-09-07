import { Decimal128, ObjectId } from "mongoose";

interface IProduct extends Document {
    name: string;
    description?: string;
    price: Decimal128;
    user: ObjectId;
}

export default IProduct;