import {gateway} from "@/library/Gateway/index"

export default async function Page(props:PageProps<"/">) {
	// console.log()
	gateway()
	return <h1>HELLO WORLD!!</h1>
}
