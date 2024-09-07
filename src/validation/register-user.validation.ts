import Joi from "joi";
const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const userRegisterValidationSchema = Joi.object({
    firstname: Joi.string().min(2).max(45).required(),
    lastname: Joi.string().min(3).max(70).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(passwordPattern)
        .min(6)
        .message("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character")
        .required(),
});

export default userRegisterValidationSchema;