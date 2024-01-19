const productManager = require("./ProductManager");
const cartsProducts = require("./CartsProduct");

const express = require('express')
const app = express()
const port = 8080

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    if (limit > 0) {
        const xProducts = productManager.getXProducts(limit);
        res.status(200).send(xProducts);
    } else {
        res.status(200).send(productManager.getProducts());
    }
})

app.get('/api/products/:pid', (req, res) => {
    let productoId = parseInt(req.params.pid);
    console.log(productManager.getProductById(productoId));
    res.status(200).send(productManager.getProductById(productoId));
});

app.post('/api/products/post', (req, res) => {
    let productData = req.body;
    console.log(req.body);
    res.status(201).send(productManager.addProduct(productData));
})

app.put('/api/products/put/:pid', (req, res) => {
    let productoId = parseInt(req.params.pid);
    let body = req.body;
    res.status(200).send(productManager.updateProduct(productoId, body));
});

app.delete('/api/products/delete/:pid', (req, res) => {
    let productoId = parseInt(req.params.pid);
    productManager.deleteProduct(productoId)
    res.status(204).send(productManager.deleteProduct(productoId));
})

app.post('/api/carts', (req, res) => {
    res.status(200).send(cartsProducts.createCart());
})

app.get('/api/carts/:cid', (req, res) => {
    let cartId = parseInt(req.params.cid);
    res.status(200).send(cartsProducts.getCartById(cartId));
})

app.post('/api/carts/:cid/products/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    res.status(201).send(cartsProducts.addProductToCart(cartId, productId));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

