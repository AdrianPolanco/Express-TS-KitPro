import { DataTypes, Model } from "sequelize";
import { postgresDatabase } from "../../config/database/sql/postgres/postgres.config";
import User from "./user.model";
import { ProductAttributes, ProductCreationAttributes } from "./attributes/product.attribute";

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: string;
    public name!: string;
    public description?: string;
    public price!: number;
    public userId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Product.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize: postgresDatabase,
        tableName: "products",
        timestamps: true,
    }
);
Product.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Product, { foreignKey: "userId", as: "products" });
export default Product;