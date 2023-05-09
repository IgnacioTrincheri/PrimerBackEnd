const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.nextId = 1;
        this.products = [];

        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data) {
                const products = JSON.parse(data);
                this.products = products;
                this.nextId = products[products.length - 1].id + 1;
            }
        }
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('All fields are required');
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error('Product with the same code already exists');
            return;
        }

        const newProduct = {
            id: !this.products.length ? 1 : this.products[this.products.length-1].id + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        
        this.products.push(newProduct);

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data) {
                return JSON.parse(data);
            }
        }
        return [];
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error('Not found');
        }
        return product;
    }

    updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('All fields are required');
            return;
        }

        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error('Product not found');
            return;
        }

        const updatedProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products[productIndex] = updatedProduct;

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error('Product not found');
            return;
        }

        this.products.splice(productIndex, 1);

        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }
}

const manager = new ProductManager("./products.json");
// Agregar un producto
manager.addProduct({
    title: "Product 1",
    description: "Descripción 1",
    price: 10,
    thumbnail: "thumbnail1.jpg",
    code: "code1",
    stock: 5,
});

// Intentar agregar un producto con el mismo código
manager.addProduct({
    title: "Product 2",
    description: "Descripción 2",
    price: 20,
    thumbnail: "thumbnail1.jpg",
    code: "code1",
    stock: 10,
});

// Obtener todos los productos
const allProducts = manager.getProducts();
console.log(allProducts);

// Obtener un producto por su ID
const productById = manager.getProductById(1);
console.log(productById);

// Obtener un producto que no existe
const nonExistingProduct = manager.getProductById(100);
console.log(nonExistingProduct);

// Actualizar un producto por su ID
manager.updateProduct(2, {
    title: "Product 2",
    description: "Nueva descripción del producto 2",
    price: 25,
    thumbnail: "thumbnail2.jpg",
    code: "Code2",
    stock: 15,
});

// Intentar actualizar un producto que no existe
manager.updateProduct(100, {
    title: "Product 100",
    description: "Nueva descripción del producto 100",
    price: 100,
    thumbnail: "thumbnail100.jpg",
    code: "Code100",
    stock: 100,
});

// Obtener todos los productos actualizados
const allUpdatedProducts = manager.getProducts();
console.log(allUpdatedProducts);

// Eliminar un producto por su ID
manager.deleteProduct(1);

// Intentar eliminar un producto que no existe
manager.deleteProduct(100);

// Obtener todos los productos después de eliminar uno
const allProductsAfterDelete = manager.getProducts();
console.log(allProductsAfterDelete);
