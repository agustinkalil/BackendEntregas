import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import config from './config.js';
import productsRoutes from './routes/products_routes.js';
import viewsRoutes from './routes/view_routes.js'

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.engine('handlebars', handlebars.engine());
server.set('views', `${config.DIRNAME}/views`);
server.set('view engine', 'handlebars');

server.use('/api/views', viewsRoutes)
server.use('/api/products', productsRoutes)
server.use('/static', express.static(`${config.DIRNAME}/public`))




const httpServer = server.listen(config.PORT, () => {console.log(`servidor activo en puerto ${config.PORT}`); })


const socketServer = new Server(httpServer);
server.set('socketServer', socketServer);

socketServer.on('connection', client => {
    console.log(`cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    client.on('NewMessage', data => {
        console.log(`mensaje enviado desde ${client.id}: ${data}`);

        client.emit('serverEmit', "ok, mensaje recibido correctamente")
    });
});