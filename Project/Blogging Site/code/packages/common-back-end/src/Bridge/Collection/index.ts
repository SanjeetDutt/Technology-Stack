import { Bridge } from "../Type";


export class Collection{
    private static instance : Collection
    private readonly collection : Bridge.ICollectable[]

    private constructor(){
        this.collection = []
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new Collection
        } 
        return this.instance
    }

    public add(collectable:Bridge.ICollectable){
        this.collection.push(collectable)
    }
}