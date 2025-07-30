import {FetchAPI} from "sanjeet-ui"

const API = FetchAPI.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	timeoutMS: 5000,
	headers: {
		contentType: 'JSON',
		authorization: 'BEARER TOKEN_HERE'
	}
});

export const APIComp = ()=>{

    const response = API.get("posts")

    return <button>Click ME to call API</button>
}