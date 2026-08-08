import {Server}  from "common-back-end"

Server()
    .listen(3000)
    .fileRouting("./src/App")
    .logs("./src/Logs")
    .start()
