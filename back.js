class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct({title, description, price, thumbnail, code, stock}) {
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
        this.nextId++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error('Not found');
        }
        return product;
    }
}
const manager = new ProductManager();

manager.addProduct({title:'Product 1', description:'Description 1', price: 10, thumbnail:'thumbnail1.jpg',code: 'code1',stock: 5});
manager.addProduct({title:'Product 2',description: 'Description 2', price: 20, thumbnail: 'thumbnail2.jpg', code: 'code2',stock: 10});

console.log(manager.getProducts());
// Output: [{id: 1, title: "Product 1", description: "Description 1", price: 10, thumbnail: "thumbnail1.jpg", code: "code1", stock: 5}, {id: 2, title: "Product 2", description: "Description 2", price: 20, thumbnail: "thumbnail2.jpg", code: "code2", stock: 10}]

console.log(manager.getProductById(1));
// Output: {id: 1, title: "Product 1", description: "Description 1", price: 10, thumbnail: "thumbnail1.jpg", code: "code1", stock: 5}

console.log(manager.getProductById(3));
// Output: "Not found"