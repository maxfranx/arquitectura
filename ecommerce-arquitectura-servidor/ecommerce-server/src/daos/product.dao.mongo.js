import { ProductModel } from '../models/product.model.js';

export default class ProductDAOMongo {
    async getAll() {
        return await ProductModel.find().lean();
    }

    async getById(id) {
        return await ProductModel.findById(id);
    }

    async create(productData) {
        return await ProductModel.create(productData);
    }

    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, { $set: productData }, { new: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}
