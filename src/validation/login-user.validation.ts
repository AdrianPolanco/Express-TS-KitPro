import Joi from "joi";

const loginUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default loginUserValidationSchema;