
import validationMiddleware from "../../../middlewares/validation/validation.middleware";
import registerUserValidationSchema from "../../../validation/users/register-user.validation";
import userController from "../../../controllers/user.controller";
import { Router } from "express";
import cacheMiddleware from '../../../middlewares/cache/cache.middleware';

const router = Router();

router.get("/postgres/:id", cacheMiddleware, userController.getByIdFromPostgres)

router.post("/postgres/register", validationMiddleware(registerUserValidationSchema), userController.createInPostgres)

router.get("/mongo/:id", cacheMiddleware, userController.getByIdFromMongo)

router.post("/mongo/register", validationMiddleware(registerUserValidationSchema), userController.createInMongo)

export default router;