import moment from "moment"

const greeting = {
    en: "Hello",
    fr: "Bonjour",
    hn: "Namaste"
}


export const handler = async (event) => {

    const { name } = event.pathParameters;
    const { lang, ...info } = event.queryStringParameters;

    const message = `${greeting[lang] || greeting["en"]} ${name}`

    // AWS lambda expect response should have status and body in it.
    return {
        statusCode: 200,
        body: {
            message,
            info,
            timestamp: moment().unix()
        }

    }
}