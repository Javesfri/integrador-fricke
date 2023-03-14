import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js"
const routerProduct = Router();
const productManager=new ProductManager('src/models/productos.txt')

routerProduct.get('/',async (req,res)=>{
    let {limit} = req.query
    const products = await productManager.getProducts();
    if(limit){
       let productsLimit  = products.slice(0,parseInt(limit))
        res.json(productsLimit)
    }else{
        res.json(products)

    }
})


routerProduct.get('/:pid',async (req,res)=>{
    const pid=parseInt(req.params.pid);
    const productId =await productManager.getProductById(pid);
    res.send(productId)
    
    
})

routerProduct.post('/',async (req,res) =>{
    let newProduct=await productManager.addProduct(req.body)
    res.send(newProduct)
    console.log(await productManager.getProducts())
})

routerProduct.delete('/:id',async (req,res) =>{
    const pid= parseInt(req.params.id)
    let deleteProduct = await productManager.deleteProduct(pid)
    res.send(await productManager.getProducts());
})

routerProduct.put('/:id',async (req,res) =>{
    const pid= parseInt(req.params.id)
    let updateProduct = await productManager.updateProduct(pid,req.body)
    res.send(updateProduct);
})

export default routerProduct;