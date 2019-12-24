import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from 'cors';
import { Router, Request, Response, NextFunction } from 'express';
import * as routes from './routes';
import * as fileUpload from 'express-fileupload';
import * as dotenv from 'dotenv'

class App {
    public app: express.Application;
    public router: Router =  Router();
    public mongoUri: string = 'mongodb://localhost:27017/ToursDB';

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
        dotenv.config();
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false } );
    }

    private addRoutes(): void {
        this.app.use(this.router);
        this.app.use(routes.tourPath, routes.tourRoutes);
    }
}
export default new App().app;