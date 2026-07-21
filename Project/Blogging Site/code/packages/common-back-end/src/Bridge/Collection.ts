import { Bridge } from './types';
import ICollection = Bridge.ICollection;
import express, { ErrorRequestHandler, Router } from 'express';
import corsLibrary from "cors"

class _Collection implements ICollection{
    private static instance?:_Collection
    private actions:Bridge.IAction<any,any,any>[]
    constructor() {
        _Collection.instance = this
        this.actions = []
    }

    public static getInstance(){
        if(_Collection.instance){
            return _Collection.instance
        } else {
            return new _Collection()
        }
    }
    public addAction(a: Bridge.IAction<any,any,any>): Bridge.ICollection {
        this.actions.push(a)
        return this
    }

    public router(): Router {
        const AppRouter = Router();
        this.actions.forEach(action=>{
            action.express(AppRouter)
        })
        return AppRouter;
    }

    //TODO: Implement custom cors policy
    public cors(): any{
        return corsLibrary()
    }

    //TODO: Implement error Handler
    public errorHandler(){
        return
    }


}

export const Collection = ()=> _Collection.getInstance()