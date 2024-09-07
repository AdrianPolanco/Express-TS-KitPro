import Product from "../../models/sql/product.model";
import User from "../../models/sql/user.model";

User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });