import bcrypt from 'bcryptjs';
import envConfig from '../config/env/env.config';

const hashPassword = async (password: string) => { 
    const salt = await bcrypt.genSalt(envConfig.saltRounds);
    return await bcrypt.hash(password, salt);
}

const checkPassword = async (password: string, hashedPassword: string) => await bcrypt.compare(password, hashedPassword);

export {hashPassword, checkPassword}