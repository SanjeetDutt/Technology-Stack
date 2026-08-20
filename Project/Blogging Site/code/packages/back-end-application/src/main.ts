import {Server}  from "common-back-end"

Server
    .Builder()
    .router("./src/App")
    .config({
        port: 3000,
        loggigPath: "./src/Logs"
    })
    .server()
