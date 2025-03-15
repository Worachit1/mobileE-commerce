import express, {Application} from 'express';
const cors = require('cors');
import path from 'path';
import { CategoryRoute, OrdersRoute, ProductRoute ,UserRoute, BusinessRoute} from '../Routes';

export default async (app:Application) => {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
    app.use('/assets', express.static('assets'))

    app.use('/category', CategoryRoute)
    app.use('/products', ProductRoute)
    app.use('/user', UserRoute)
    app.use('/business', BusinessRoute)
    app.use('/', OrdersRoute)
    

    return app;
}