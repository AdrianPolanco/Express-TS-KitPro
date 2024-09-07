import { Optional } from "sequelize";

type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, "id">

export { UserAttributes as UserAttributes, UserCreationAttributes as UserCreationAttributes };