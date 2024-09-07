import { DataTypes, Model } from "sequelize";
import { postgresDatabase } from "../../config/database/sql/postgres/postgres.config";
import { UserAttributes, UserCreationAttributes } from "./attributes/user.attribute";
import { hashPassword } from "../../utils/password.utils";
import Product from "./product.model";


class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: postgresDatabase,
        tableName: "users",
        timestamps: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password)
                    user.password = await hashPassword(user.password);
            },
            beforeUpdate: async (user: User) => {
                if (user.password && user.changed("password")) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
    }
);

export default User;