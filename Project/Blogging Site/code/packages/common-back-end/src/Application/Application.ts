import express, { Express, Application as ExpressApp } from 'express';
import { Collection } from '../Bridge';

class _Application {
    private static instance?:_Application
    private readonly app: Express

    constructor() {
        _Application.instance = this
        this.app = express()
    }
    public static getInstance(){
        if(_Application.instance){
            return _Application.instance
        } else {
            return  new _Application()
        }
    }

    public use(plugin:any){
        this.app.use(plugin)
    }

    public export(){
        return this.app
    }

    public json(){
        this.app.use(express.json())
    }

    public urlEncode(){
        this.app.use(express.urlencoded({extended:true}))
    }

    public REST_API(){
        this.urlEncode()
        this.json()

        const collection = Collection()
        this.app.use(collection.cors())
        this.app.use(collection.router())
        // this.app.use(collection.errorHandler()) //TODO: ERROR HANDLER

        return this.export()
    }
}

const Application = () => _Application.getInstance()

export const REST_APPLICATION = () => Application().REST_API()

