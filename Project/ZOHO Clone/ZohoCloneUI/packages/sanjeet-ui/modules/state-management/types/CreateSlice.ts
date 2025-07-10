import * as ReduxToolkit from '@reduxjs/toolkit';
import { type Slice } from './Slice';

export namespace CreateSlice {
	type Props<S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>> = {
		state: S;
		method?: M;
		computed?: C;
	};

	export type Returns<S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>> = {
		name: string;
		reducers: ReduxToolkit.Reducer<S>;
		actions: ReduxToolkit.CaseReducerActions<{ [key: string]: any }, string>;
	} & Props<S, M, C>;

	export type Function = <S, M extends Slice.MethodObject<S>, C extends Slice.ComputedObject<S>>(p: Props<S, M, C>) => Returns<S, M, C>;
}
