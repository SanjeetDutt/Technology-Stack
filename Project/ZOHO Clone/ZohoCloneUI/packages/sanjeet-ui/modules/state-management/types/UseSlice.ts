import type { CreateSlice } from './CreateSlice';
import { type Slice } from './Slice';

export namespace UseSlice {
	export type Method<S, M extends Slice.MethodObject<S>> = {
		[i in keyof M]: (...p: Parameters<M[i]>) => void;
	};

	export type Computed<S, C extends Slice.ComputedObject<S>> = {
		[i in keyof C]: ReturnType<C[i]>;
	};

	export type Function = <S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>>(
		props: CreateSlice.Returns<S, M, C>
	) => {
		data: S;
		method: Method<S, M>;
		computed: Computed<S, C>;
	};
}
