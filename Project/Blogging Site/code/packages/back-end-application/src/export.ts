import { Server } from "common-back-end";

Server
    .Builder()
    .router("./src/APP")
    .config({
        port:3000,
    })
    .export("./src/export.JSON")
    