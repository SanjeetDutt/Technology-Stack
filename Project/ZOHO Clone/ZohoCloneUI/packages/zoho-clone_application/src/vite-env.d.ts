/// <reference types="vite/client" />
GENERATE_SOURCEMAP=false
declare module '*.png' {
	const value: any
	export = value
}