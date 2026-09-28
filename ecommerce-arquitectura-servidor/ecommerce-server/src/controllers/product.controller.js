import { productRepository } from '../repositories/index.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productRepository.getAll();
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await productRepository.create(req.body);
        res.status(201).json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await productRepository.update(req.params.pid, req.body);
        res.json({ status: 'success', payload: updated });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productRepository.delete(req.params.pid);
        res.json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
