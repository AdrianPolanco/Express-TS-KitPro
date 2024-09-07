import { DataTypes, Model } from "sequelize";
import { postgresDatabase } from "../../config/database/sql/postgres/postgres.config";
import { IUserAttributes, IUserCreationAttributes } from "./interfaces/user.attribute";
import { hashPassword } from "../../utils/password.utils";

const User = postgresDatabase.define<Model<IUserAttributes, IUserCreationAttributes>>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'users',
    hooks: {
        beforeCreate: async (user: any) => {
            if (user.password) hashPassword(user.password);
        },
        beforeUpdate: async (user: any) => {
            if (user.password && user.changed('password')) hashPassword(user.password);
        }
    }
});

export default User;