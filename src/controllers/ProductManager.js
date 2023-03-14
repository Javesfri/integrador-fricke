import fs from "fs";
//Creo el archivo si no existe

//clase de product
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = true;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id;
  }
}

//clase del productManager
export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  async addProduct(product) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(content);
    if (this.products.some((productt) => productt.code === product.code)) {
      return "Error: El codigo de  product Ya Existe";
    } else {
      if (this.emptyInput(product)) {
        return "Complete Todos Los campos";
      } else {
        product.status = true;
        product.id = ProductManager.setId();
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return "Producto Creado!";
      }
    }
  }

  async getProducts() {
    const content = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(content);
    return this.products;
  }
  async getIdProducts() {
    const products = await this.getProducts();
    const IdProducts = products.map((product) => product.id);
    return IdProducts;
  }

  async getProductById(id) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(content);
    const product = this.products.find((elemento) => elemento.id === id);
    if (product !== undefined) {
      return product;
    }
    return "producto no encontrado";
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(content);
    if (this.products.some((product) => product.id === id)) {
      let index = this.products.findIndex((product) => product.id === id);
      this.products[index].title = title;
      this.products[index].description = description;
      this.products[index].price = price;
      this.products[index].thumbnail = thumbnail;
      this.products[index].code = code;
      this.products[index].stock = stock;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log(await this.products);
      return "Producto Actualizado";
    }
    return "product No encontrado";
  }

  async deleteProduct(id) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(content);
    if (this.products.some((product) => product.id === id)) {
      let newArray = this.products.filter((item) => item.id !== id);

      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return "Producto Eliminado";
    } else return "producto No encontrado";
  }

  static setId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }

    return this.id;
  }

  emptyInput(product) {  //Comprueba Que todos los campos esten completos
    if (
      product.title.length == 0 ||
      product.description.length == 0 ||
      product.price.length == 0 ||
      product.code.length == 0 ||
      product.stock.length == 0
    ) {
      return true;
    }
    return false;
  }
}
