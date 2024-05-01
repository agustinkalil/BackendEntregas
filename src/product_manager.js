import fs from 'fs';

export class ProductManager {
    constructor(file){
        this.products = [];
        this.file = file;
    }

    async addProduct(newProduct){
        const validation = 
            newProduct.title && 
            newProduct.description && 
            newProduct.price && 
            newProduct.thumbnail &&
            newProduct.code &&
            newProduct.stock;

        const isDuplicate = this.products.some(prod => prod.code === newProduct.code);

        if(validation && !isDuplicate){
            newProduct.id = this.products.length + 1;
            this.products.push(newProduct);
            await this.saveProductsToFile();
        } else {
            console.log(`Error: el producto con código ${newProduct.code} ya existe o datos incompletos.`);
        }
    }

    async getProduct(limit) {
        try {
            const readProduct = await fs.promises.readFile(this.file, 'utf-8');
            this.products = JSON.parse(readProduct);
            return limit === 0 ? this.products : this.products.slice(0, limit)
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return null;
        }

    }

    async saveProductsToFile() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(this.products, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error al guardar en el archivo:", error);
        }
    }

    async getProductById(id){
        const readProduct = await fs.promises.readFile(this.file, 'utf-8');
        this.products = JSON.parse(readProduct);
        

        const product = this.products.find(prod => prod.id === +id) || {};
        return product;
    }

    async updateProductById(id, updateProduct){
        const index = this.products.findIndex(prod => prod.id === id)
        
        if(index){
            if("id" in updateProduct){
                return console.log("el campo id no puede modificarse");
            }else{
                this.products[index] = {...this.products[index], ...updateProduct}
                await this.saveProductsToFile()
                /* console.log("producto actualizado correctamente"); */
            }
        }else{
            console.log("producto no encontrado");
        }
    }

    async deleteProduct (id){
        return this.products.filter(prod => prod.id !== id)
        
    }


    }
const productManager = new ProductManager('./src/c2.json');

(async () => {
    await productManager.addProduct({
        title: "Camiseta de algodón",
        description: "Camiseta de algodón suave y cómoda en varios colores.",
        price: 15.99,
        thumbnail: "https://ejemplo.com/camiseta.jpg",
        code: "CT001",
        stock: 50
    });

    await productManager.addProduct({
        title: "Zapatillas deportivas",
        description: "Zapatillas deportivas ligeras y transpirables para correr o hacer ejercicio.",
        price: 49.99,
        thumbnail: "https://ejemplo.com/zapatillas.jpg",
        code: "ZP002",
        stock: 30
    });

    await productManager.addProduct({
        title: "Bolso de cuero",
        description: "Bolso de cuero genuino con varios compartimentos y correa ajustable.",
        price: 79.99,
        thumbnail: "https://ejemplo.com/bolso.jpg",
        code: "BL003",
        stock: 20
    });

    await productManager.addProduct({
        title: "Pantalon de Jean",
        description: "Pantalon de jean color azul, sin roturas.",
        price: 30.99,
        thumbnail: "https://ejemplo.com/jean.jpg",
        code: "XC004",
        stock: 18
    });


    /* console.log(await productManager.getProduct(4));

    console.log(await productManager.deleteProduct(4)); */
    
})();
























































/* import fs, { read } from 'fs'

class ProductManager {
    constructor(file){
        this.products = [];
        this.file = file;
    }

    async addProduct(newProduct){

    const validation = 
      newProduct.title && 
      newProduct.description && 
      newProduct.price && 
      newProduct.thumbnail &&
      newProduct.code &&
      newProduct.stock;

      const isDuplicate = this.products.some((prod) => {prod.code === newProduct.code})

      if(validation && !isDuplicate){
        newProduct.id = this.products.length + 1
        this.products.push(newProduct);
        await fs.promises.writeFile(this.file, JSON.stringify(this.products), 'utf-8')
      }else{
        console.log(`not found, el producto con codigo ${newProduct.code} ya existe`);
      }

    }

    async getProduct() {
        try {
            const readProduct = await fs.promises.readFile(this.file, 'utf-8');
            const productParsed =  JSON.parse(readProduct);
            this.products = productParsed;
            return this.products;
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return null;
        }
    }


    getProductById(){

    }
}

const productManager = new ProductManager('./src/c2.json')

productManager.addProduct({
    title: "Camiseta de algodón",
    description: "Camiseta de algodón suave y cómoda en varios colores.",
    price: 15.99,
    thumbnail: "https://ejemplo.com/camiseta.jpg",
    code: "CT001",
    stock: 50
});

productManager.addProduct({
    title: "Zapatillas deportivas",
    description: "Zapatillas deportivas ligeras y transpirables para correr o hacer ejercicio.",
    price: 49.99,
    thumbnail: "https://ejemplo.com/zapatillas.jpg",
    code: "ZP002",
    stock: 30
  });

productManager.addProduct({
    title: "Bolso de cuero",
    description: "Bolso de cuero genuino con varios compartimentos y correa ajustable.",
    price: 79.99,
    thumbnail: "https://ejemplo.com/bolso.jpg",
    code: "BL003",
    stock: 20
  });

productManager.addProduct({
    title: "Pantalon de Jean",
    description: "Pantalon de jean color azul, sin roturas.",
    price: 30.99,
    thumbnail: "https://ejemplo.com/jean.jpg",
    code: "XC004",
    stock: 18

})



console.log(await productManager.getProduct()); */