import { Router } from 'express';
import {data} from '../data.js'
import { ProductManager } from '../product_manager.js';

const router = Router();
const productManager = new ProductManager('./src/c2.json');

router.get('/welcome', (req, res) => {
    const user = { firstName: 'Agustin' };
    res.render('index', user);
});

router.get('/users', (req, res) => {
    const users = { users: data };
    /**
     * Atención!, el 2do parámetro del render debe ser siempre un objeto
     * con las propiedades que necesitemos tener disponibles en la plantilla,
     * en este ejemplo un elemento users que contiene el array con los datos de usuario
     * (ver users.handlebars)
     */
    res.render('users', users);
});

// Habilitamos un endpoint extra, para parsear la plantilla del chat, que nos permite
// probar la conexión cliente Websockets
router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/products', async(req, res) => {
    const getProducts = await productManager.getProduct();
    res.render('realTimeProducts', { products: getProducts})
    
})

export default router;