import {ServerBuilder}  from "common-back-end"

ServerBuilder()
    .listen(3000)
    .fileRouting("./src/App")
    .logs("./src/Logs")
    .start()
