import UserDAOMongo from '../daos/user.dao.mongo.js';
import ProductDAOMongo from '../daos/product.dao.mongo.js';
import UserRepository from './user.repository.js';
import ProductRepository from './product.repository.js';

export const userRepository = new UserRepository(new UserDAOMongo());
export const productRepository = new ProductRepository(new ProductDAOMongo());
