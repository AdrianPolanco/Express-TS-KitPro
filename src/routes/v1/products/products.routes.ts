import { Router } from "express";
import productController from "../../../controllers/product.controller";
import validationMiddleware from "../../../middlewares/validation/validation.middleware";
import { createProductValidationSchemaMongo } from "../../../validation/products/create-product.validation";
import cacheMiddleware from '../../../middlewares/cache/cache.middleware';

const router = Router();

router.get("/postgres/:id", cacheMiddleware, productController.getByIdFromPostgres)

router.post("/postgres/register", validationMiddleware(createProductValidationSchemaMongo), productController.createInPostgres)

router.get("/mongo/:id", cacheMiddleware, productController.getByIdFromMongo)

router.post("/mongo/register", validationMiddleware(createProductValidationSchemaMongo), productController.createInMongo)

export default router;