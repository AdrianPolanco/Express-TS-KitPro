import { Optional } from "sequelize";

export type ProductAttributes = {
    id: string;
    name: string;
    description?: string;
    price: number;
    userId: string;
}

export type ProductCreationAttributes = Optional<ProductAttributes, "id">;
