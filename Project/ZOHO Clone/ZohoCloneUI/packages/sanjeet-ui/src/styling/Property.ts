import * as CSS from "csstype"
import {type Measurement} from "./Measurement";
import type {ModifiedStandardProperty} from "../configuration/CSSType";

export type Property<BP = {}> =
	| _ModifiedStandardProperty
	| StandardBreakpointProperty<BP>


type Modify<T,R> = Omit<T, keyof R> & R

type StandardBreakpointProperty<BP = {}> = {
	[_ in keyof BP]?: Partial<_ModifiedStandardProperty>
}

interface _ModifiedStandardProperty extends
	Modify<
		StandardProperty,
		Partial<ModifiedStandardProperty>
	>
{}

interface StandardProperty extends
	StandardLongHandProperty,
	StandardShortHandProperty
{}

interface StandardLongHandProperty extends
	CSS.StandardLonghandProperties<Measurement>
{}

interface StandardShortHandProperty extends
	CSS.StandardShorthandProperties<Measurement>
{}

