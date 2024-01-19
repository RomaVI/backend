const ProductManager = require("./ProductManager");

class CartsProducts {
    constructor(productManager) {
        this.carts = [];
        this.counter = 0;
        this.idMap = new Map();
        this.productManager = productManager;
    }

    generateId() {
        let newId = ++this.counter;
        while (this.idMap.has(newId)) {
            newId = ++this.counter;
        }
        this.idMap.set(newId, true);
        return newId;
    }

    getCarts() {
        return this.carts;
    }

    createCart() {
        const newCartId = this.generateId();
        const newCart = { id: newCartId, products: [] };

        this.carts.push(newCart);
        return newCart;
    }

    getCartById(id) {
        const cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            throw new Error(`Carrito con ID ${id} no encontrado.`);
        }
        return cart;
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        const product = this.productManager.getProductById(productId);

        if (!product) {
            throw new Error(`Producto con ID ${productId} no encontrado.`);
        }

        const existingProductIndex = cart.products.findIndex(p => p.productId === productId);
        
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        return cart;
    }
}

const productManager = require("./ProductManager");
const cartsProducts = new CartsProducts(productManager);


console.dir(cartsProducts.getCarts(), { depth: null });
