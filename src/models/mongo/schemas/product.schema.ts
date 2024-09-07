import { Schema, Decimal128, model } from 'mongoose';
import IProduct from '../interfaces/product.interface';

const { Decimal128, ObjectId } = Schema.Types;

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Decimal128,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, collection: 'products' });

const Product = model<IProduct>('Product', productSchema);

export default Product;