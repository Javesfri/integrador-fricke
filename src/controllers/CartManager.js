import fs from "fs";

export class CartManager {
  constructor(path, productsPath) {
    this.path = path;
    this.productsPath = productsPath;
  }

  async addCart() {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(content);
    const cart = {
      id: CartManager.setId(),
      products: [],
    };
    arrayCart.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(arrayCart));
    return "Carrito Creado";
  }

  async getProductsFromCart(id) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(content);
    const cartSelected = carts.find((cartt) => cartt.id === id);
    if (cartSelected !== undefined) {
      return cartSelected.products;
    }
    return "Carrito Inexistente";
  }

  async addProductToCart(cartId, productId) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(content);

    const cartIndex = arrayCart.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {//Compruebo que el carrito existe
      const productCartIndex = arrayCart[cartIndex].products.findIndex(
        (prod) => prod.product === productId
      );
      if (productCartIndex !== -1) {//Compruebo si el id del producto ya está agregado al cart
        arrayCart[cartIndex].products[productCartIndex].quantity += 1;
      } else {
        const productContent = await fs.promises.readFile(
          this.productsPath,
          "utf-8"
        );
        const arrayProduct = JSON.parse(productContent);
        if (arrayProduct.some((prod) => prod.id === productId)) { //Si el Id del producto no está agregado al cart, compruebo si el id es el de algun producto cargado, 
          arrayCart[cartIndex].products.push({ //si esta cargado, lo agrego al carrito
            product: productId,
            quantity: 1,
          });
        } else {
          return "No existe un producto con ese Id";
        }
      }

      await fs.promises.writeFile(this.path, JSON.stringify(arrayCart));
      return "Producto Agregado Al Carrito";
    } else {
      return "Carrito No Encotrado";
    }
  }

  async deleteProductOfCart(cartId, productId) {
    const content = await fs.promises.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(content);
    const cartIndex = arrayCart.findIndex( cart => cart.id== cartId);
    if(cartIndex !== -1){
      
      if(arrayCart[cartIndex].products.some(prod =>prod.product==productId)){
         arrayCart[cartIndex].products=arrayCart[cartIndex].products.filter((item) => item.product !== productId);
        await fs.promises.writeFile(this.path, JSON.stringify(arrayCart));
        return("Producto Eliminado")
      }
      return("No se encuentra el Producto con ese ID")
    }
    return("No se encuentra el carrito con ese ID")
  }

  static setId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }

    return this.id;
  }
}
