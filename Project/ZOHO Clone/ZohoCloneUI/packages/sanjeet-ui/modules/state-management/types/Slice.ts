import type { StringObject } from './StringObject';

export namespace Slice {
	export type Computed<S> = (s: S) => any;
	export type ComputedObject<S> = StringObject<Slice.Computed<S>>;

	export type Method<S> = (...payload: any) => (s: S) => void;
	export type MethodObject<S> = StringObject<Slice.Method<S>>;

	// export type Thunk<S> = (payload:any) => (s:S)=>Promise<void>
	// export ty
}
