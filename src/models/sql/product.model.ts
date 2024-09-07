import { DataTypes } from "sequelize";
import { postgresDatabase } from "../../config/database/sql/postgres/postgres.config";
import User from "./user.model";

const Product = postgresDatabase.define('Product', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, { timestamps: true, tableName: 'products' });

export default Product;