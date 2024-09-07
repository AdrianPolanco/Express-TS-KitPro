import { postgresDatabase } from "../config/database/sql/postgres/postgres.config";
import { Request, Response } from "express";
import logger from "../config/logging/winston.config";
import Product from "../models/sql/product.model";
import MongoProduct from "../models/mongo/schemas/product.schema";

class ProductController{
    async createInPostgres(req: Request, res: Response) { 
        const transaction = await postgresDatabase.transaction();
        try {
            const { name, price, description, userId } = req.body;
            const existingProduct = await Product.findOne({ where: { name } });
            if (existingProduct) {
                logger.error("Product already exists");
                return res.status(409).json({ message: "Product already exists" });
            }
            const newProduct = await Product.create({ name, price, userId, description: description?? "" }, { transaction });
            await transaction.commit();
            logger.info(`Product ${newProduct.name} registered successfully`);
            return res
                .status(201)
                .json({ message: "Product registered successfully", product: { name, price, userId } });
        } catch (error) {
            await transaction.rollback();
            logger.error(`Error registering product: ${error}`);
            return res.status(500).json({ message: "Error registering product" });
        }
    }

    async getByIdFromPostgres(req: Request, res: Response) { 
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                logger.error("Product not found");
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        } catch (error) {
            logger.error(`Error fetching product: ${error}`);
            return res.status(500).json({ message: "Error fetching product" });
        }
    }

    async createInMongo(req: Request, res: Response) { 
        try {
            
            const { name, price, description, userId } = req.body;
            const existingProduct = await MongoProduct.findOne({ name });
            if (existingProduct) {
                logger.error("Product already exists");
                return res.status(409).json({ message: "Product already exists" });
            }
            const newProduct = new MongoProduct({ name, price, userId, description: description ?? "" });
            await newProduct.save();
            logger.info(`Product ${newProduct.name} registered successfully`);
            return res.status(201).json({ message: "Product registered successfully", product: { name, price, userId } });
        } catch (error) {
            logger.error(`Error registering product: ${error}`);
            return res.status(500).json({ message: "Error registering product" });
        }
    }

    async getByIdFromMongo(req: Request, res: Response) { 
        try {
            const { id } = req.params;
            const product = await MongoProduct.findById(id);
            if (!product) {
                logger.error("Product not found");
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        } catch (error) {
            logger.error(`Error fetching product: ${error}`);
            return res.status(500).json({ message: "Error fetching product" });
        }
    }
}

export default new ProductController();