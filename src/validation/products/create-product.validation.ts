import Joi from "joi";
import { ObjectId } from 'mongoose';

const createProductValidationSchemaPostgres = Joi.object({
    name: Joi.string().min(2).max(70).required(),
    description: Joi.string().min(1).max(200).not().required(),
    price: Joi.number().min(0).required(),
    userId: Joi.string().uuid().required(),
});

export const createProductValidationSchemaMongo = Joi.object({
    name: Joi.string().min(2).max(70).required(),
    description: Joi.string().min(1).max(200).not().required(),
    price: Joi.number().min(0).required(),
    userId: Joi.string().required(),
})

export default createProductValidationSchemaPostgres;