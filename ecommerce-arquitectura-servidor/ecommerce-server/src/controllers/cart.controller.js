export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        // Lógica de agregado de producto al carrito del usuario
        res.json({ status: 'success', message: `Producto ${pid} agregado al carrito ${cid}` });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
