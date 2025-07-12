import { Breakpoint } from '../breakpoint';
import { Measurement } from '../measurement';

interface SizingCore {
	height?: Measurement;
	width?: Measurement;
	paddingLeft?: Measurement;
	paddingRight?: Measurement;
	paddingTop?: Measurement;
	paddingBottom?: Measurement;
	marginLeft?: Measurement;
	marginRight?: Measurement;
	marginTop?: Measurement;
	marginBottom?: Measurement;
	padding?: Measurement | [Measurement, Measurement?, Measurement?, Measurement?];
	Margin?: Measurement | [Measurement, Measurement?, Measurement?, Measurement?];
}

export interface Sizing extends SizingCore, Breakpoint<SizingCore> {}

//Function will receive all the props passed to the component and return array
//Where 1 element is relative class name of all the props passed
//2nd will be style property
export const decodeSizing = (props: Sizing): string[] => {
	return [];
};
