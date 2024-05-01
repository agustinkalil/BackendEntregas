import { Router } from "express";
import { ProductManager } from '../product_manager.js';
import {uploader} from '../uploader.js'

const router = Router();
const productManager = new ProductManager('./src/c2.json');

router.get('/', async(req, res) => {
    const limit = parseInt(req.query.limit) || 0;   
    const products = await productManager.getProduct(limit);
    res.send({status:"ok", payload: products })
})

router.get('/:pid', async(req, res) => {
    const pid = await productManager.getProductById(req.params.pid);
    
    res.send({status:1, payload: pid })
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    const socketServer = req.app.get('socketServer');

    const newProduct = await productManager.addProduct(req.body)
    res.send({status: "ok, nuevo producto cargado", payload: newProduct})

    socketServer.emit('newProduct', req.body)
    
})

router.put('/:pid', async(req, res) => {
    const productUpdate = await productManager.updateProductById(req.params.pid, req.body)

    res.send({status:"ok, producto actualizado en array", payload: productUpdate})
})

router.delete('/:pid', async(req, res) => {
    await productManager.deleteProduct(req.params.pid)
    res.send({status:"producto eliminado", payload: productManager.getProduct()})
})


export default router;