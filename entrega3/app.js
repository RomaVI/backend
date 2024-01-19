const express = require('express');
const productManager = require('./ProductManager');
const cartsProducts = require('./CartsProduct');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

// Rutas de Productos
app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const products = limit > 0 ? productManager.getXProducts(limit) : productManager.getProducts();
    res.status(200).send(products);
});

app.get('/api/products/:pid', (req, res) => {
    const productoId = parseInt(req.params.pid);
    res.status(200).send(productManager.getProductById(productoId));
});

app.post('/api/products/post', (req, res) => {
    const productData = req.body;
    res.status(201).send(productManager.addProduct(productData));
});

app.put('/api/products/put/:pid', (req, res) => {
    const productoId = parseInt(req.params.pid);
    const body = req.body;
    res.status(200).send(productManager.updateProduct(productoId, body));
});

app.delete('/api/products/delete/:pid', (req, res) => {
    const productoId = parseInt(req.params.pid);
    console.log("id a eliminar:", productoId);
    const deletedProduct = productManager.deleteProduct(productoId);
    res.status(204).send(deletedProduct);
});

// Rutas de Carritos
app.post('/api/carts', (req, res) => {
    res.status(200).send(cartsProducts.createCart());
});

app.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    res.status(200).send(cartsProducts.getCartById(cartId));
});

app.post('/api/carts/:cid/products/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    try {
        const updatedCart = cartsProducts.addProductToCart(cartId, productId);
        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
