import UserDTO from '../dtos/user.dto.js';

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getByEmail(email) {
        return await this.dao.getByEmail(email);
    }

    async create(userData) {
        return await this.dao.create(userData);
    }

    async update(id, userData) {
        return await this.dao.update(id, userData);
    }

    async getCurrentUser(id) {
        const user = await this.dao.getById(id);
        return user ? new UserDTO(user) : null;
    }
}
