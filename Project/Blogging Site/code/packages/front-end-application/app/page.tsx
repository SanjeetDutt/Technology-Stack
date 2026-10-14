import {gateway} from "@/library/Gateway/generate"

export default async function Page(props:PageProps<"/">) {
	// console.log()
	gateway()
	return <h1>HELLO WORLD!!</h1>
}
