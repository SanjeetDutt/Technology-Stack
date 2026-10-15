import {generateSchema} from "common-front-end/src"

function main(){
    const input = "library/Gateway/Gateway.json"
    const output = "library/Gateway/Gateway.schema.ts"
    generateSchema(input, output)
}

main()