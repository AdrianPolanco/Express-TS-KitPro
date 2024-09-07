import { Optional } from "sequelize";

interface IUserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> { }

export { IUserAttributes, IUserCreationAttributes };