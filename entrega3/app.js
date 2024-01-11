const productManager = require("./ProductManager");

const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 0; // El valor predeterminado es 0 si no se proporciona el parámetro limit.
    if (limit > 0) {
        const xProducts = productManager.getXProducts(limit);
        res.send(xProducts);
    } else{
        res.send(productManager.getProducts());
    }
})

app.get('/products/:pid', (req, res) => {
    let productoId = parseInt(req.params.pid);
    console.log("hola",productoId);
    console.log("busqueda",productManager.getProductById(2));
    res.send(productManager.getProductById(productoId));

});


app.get('/usuario', (req, res) => {
    res.send({ id: 1, user: "Roma!", post: [] })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

