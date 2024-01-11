
class ProductManager {
    constructor(path) {
        this.products = [];
        this.counter = 0;
        this.idMap = new Map();
        this.path = path || ''; 
    }

    generateId() {
        let newId = ++this.counter;
        while (this.idMap.has(newId)) {
            newId = ++this.counter;
        }
        this.idMap.set(newId, true);
        return newId;
    }

    getProducts() {
        return this.products;
    }

    addProduct(productData) {
        const isCodeDuplicate = this.products.some((product) => product.code === productData.code);

        if (isCodeDuplicate) {
            throw new Error(`Error Producto repetido, code: ${productData.code}`);
        }

        const newProduct = {
            id: this.generateId(),
            ...productData,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            throw new Error('Producto no encontrado.');
        }

        return product;
    }
    getXProducts(xs){
        let i=0;
        let xProducts = this.products.filter(product => product.id <= xs);

        return xProducts;
    }
    updateProduct(id, updatedFields) {
        const productIndex = this.findIndexById(id);

        if (productIndex === -1) {

            throw new Error('Producto no encontrado.');
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.findIndexById(id);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado.');
        }

        const deletedProduct = this.products.splice(productIndex, 1)[0];
        this.idMap.delete(id);

        return deletedProduct;
    }

    findIndexById(id) {
        return this.products.findIndex((product) => product.id === id);
    }

    filterProductsByCode(code) {
        return this.products.filter((product) => product.code === code);
    }

    sortProductsByPrice() {
        return [...this.products].sort((a, b) => a.price - b.price);
    }
}


const productManager = new ProductManager('/documents/rutaDeEjemplo');



const newProduct1 = productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción 1',
    price: 100,
    thumbnail: 'Imagen 1',
    code: 'ABC123',
    stock: 20,
});

const newProduct2 = productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción 2',
    price: 1500,
    thumbnail: 'Imagen 2',
    code: 'DEF456',
    stock: 15,
});

const newProduct3 = productManager.addProduct({
    title: 'Producto 3',
    description: 'Descripción 3',
    price: 90,
    thumbnail: 'Imagen 2',
    code: 'DE6',
    stock: 15,
});



module.exports = productManager;