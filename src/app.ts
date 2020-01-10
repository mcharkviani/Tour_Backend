import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import { Router, Request, Response, NextFunction } from 'express';
import * as routes from './routes';
import * as fileUpload from 'express-fileupload';
import * as dotenv from 'dotenv'
import * as path from 'path';
import * as morgan from 'morgan';

class App {
    public app: express.Application;
    public router: Router =  Router();
    public mongoUri: any = process.env.MONGO_URI;

    constructor() {
        this.app = express(); 
        this.config();
        this.mongoSetup();
        this.addRoutes();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(fileUpload());
        this.app.use(morgan('dev'));
        // this.app.use(express.static(path.join(__dirname, 'public')));
        dotenv.config();
    }

    private mongoSetup(): void { 
        mongoose.connect(this.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        .then(() => {
            console.log('DB Successfully Connected');
        })
        .catch(err => {
            console.log(`Error occurred - ${err}`);
        })
    }

    private addRoutes(): void {
        this.app.use(this.router);
        this.app.use(routes.tourPath, routes.tourRoutes);
        this.app.use(routes.imagePath, routes.imageRoutes);
    }
}
export default new App().app;