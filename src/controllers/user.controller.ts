import { Request, Response } from "express";
import { postgresDatabase } from "../config/database/sql/postgres/postgres.config";
import User from "../models/sql/user.model";
import MongoUser from "../models/mongo/schemas/user.schema";
import logger from "../config/logging/winston.config";

class UserController {
    async createInPostgres(req: Request, res: Response) {
        const transaction = await postgresDatabase.transaction();

        try {
            const { firstName, lastName, email, password } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                logger.error("User already exists");
                return res.status(409).json({ message: "User already exists" });
            }

            const newUser = await User.create({ firstName, lastName, email, password }, { transaction });

            await transaction.commit();
            
            logger.info(`User ${newUser.email} registered successfully`);
            return res
                .status(201)
                .json({ message: "User registered successfully", user: { firstName, lastName, email } });
        } catch (error) {
            await transaction.rollback();
            logger.error(`Error registering user: ${error}`);
            return res.status(500).json({ message: "Error registering user" });
        }
    }

    async getByIdFromPostgres(req: Request, res: Response) { 
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                logger.error("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error) {
            logger.error(`Error fetching user: ${error}`);
            return res.status(500).json({ message: "Error fetching user" });
        }
    }

    async createInMongo(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const existingUser = await MongoUser.findOne({ email });
            if (existingUser) {
                logger.error("User already exists");
                return res.status(409).json({ message: "User already exists" });
            }

            const newUser = new MongoUser({ firstName, lastName, email, password });
            await newUser.save();

            logger.info(`User ${newUser.email} registered successfully`);
            return res
                .status(201)
                .json({ message: "User registered successfully", user: { firstName, lastName, email } });
        } catch (error) {
            logger.error(`Error registering user: ${error}`);
            return res.status(500).json({ message: "Error registering user" });
        }
    }
    
    async getByIdFromMongo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await MongoUser.findById(id);
            if (!user) {
                logger.error("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);
        } catch (error) {
            logger.error(`Error fetching user: ${error}`);
            return res.status(500).json({ message: "Error fetching user" });
        }
    }
}

export default new UserController();