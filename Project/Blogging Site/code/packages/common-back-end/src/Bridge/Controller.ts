import { Bridge } from './types';

class _Controller implements Bridge.IController{

    private readonly path: Bridge.Path
    constructor(path: Bridge.Path){
        this.path = path
    }

    getPath(): Bridge.Path {
        return this.path
    }

}

export const Controller = (path: Bridge.Path)=> new _Controller(path)