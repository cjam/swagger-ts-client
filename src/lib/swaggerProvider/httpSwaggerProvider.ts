import { ISwaggerProvider } from "./swaggerProvider"
import { ISettings } from "../settings";
import * as Swagger from "swagger-schema-official";
import * as request from "request-promise-native";
import {ILogger} from "../logger";


export class HttpSwaggerProvider implements ISwaggerProvider{
    constructor(private url: string, private userName: string= "", private password: string= ""){
        if(!url){
            throw new Error("Url to fetch swagger definition is not provided");
        }
    }
    async provide(settings:ISettings,logger:ILogger):Promise<Swagger.Spec>{
        let response = null;
        if (this.userName && this.password){
            logger.info(`Requesting swagger definitions from ${this.url} ...`);
            response = await request.get(this.url).auth(this.userName, this.password, false);
            logger.info(`Received swagger definitions from ${this.url} ...`);
            return JSON.parse(response) as Swagger.Spec;
        }
        else{
            logger.info(`Requesting swagger definitions from ${this.url} ...`);
            response = await request.get(this.url);
            logger.info(`Received swagger definitions from ${this.url} ...`);
            return JSON.parse(response) as Swagger.Spec;            
        }    
    }
}