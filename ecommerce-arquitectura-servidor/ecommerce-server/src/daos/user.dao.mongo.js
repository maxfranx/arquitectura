import { UserModel } from '../models/user.model.js';

export default class UserDAOMongo {
    async getById(id) {
        return await UserModel.findById(id);
    }

    async getByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async create(userData) {
        return await UserModel.create(userData);
    }

    async update(id, userData) {
        return await UserModel.findByIdAndUpdate(id, { $set: userData }, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}
