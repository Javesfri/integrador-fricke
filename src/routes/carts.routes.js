import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";

const routerCart = Router();
const cartManager=new CartManager('src/models/carrito.txt','src/models/productos.txt')
routerCart.post('/', async (req,res)=>{
    const newCart =await cartManager.addCart()
    res.send(newCart)
})

routerCart.get('/:cid', async (req,res)=>{
    const products=await cartManager.getProductsFromCart(parseInt(req.params.cid))
    res.send(products)

})

routerCart.post('/:cid/product/:pid',async (req,res)=>{
    const addProductToCart=await cartManager.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid))
    res.send(addProductToCart)

})

routerCart.delete('/:cid/product/:pid',async (req,res)=>{
    const deleteProductOfCart=await cartManager.deleteProductOfCart(parseInt(req.params.cid),parseInt(req.params.pid));
    res.send(deleteProductOfCart);
})

export default routerCart