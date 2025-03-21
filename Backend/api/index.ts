import express  from "express";
import App from './Services/ExpressApp';
import DbCon from './Services/Database';
import {PORT} from './config';

const StratServer = async () => {
    const app = express();
    await DbCon();
    await App(app)  

    app.listen(PORT, () => {
        console.log(`New connection receives ${PORT}`)
    })
}

StratServer();