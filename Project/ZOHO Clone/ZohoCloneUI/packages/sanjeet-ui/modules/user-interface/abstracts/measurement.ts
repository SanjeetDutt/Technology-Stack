/**
 * Measurement units currently supports
 * px
 * rem:      Relative to font-size of the root element
 * vw:       Relative to 1% of the width of the viewport
 * vh:       Relative to 1% of the height of the viewport
 */

type px = `${string}px` | '0';
type rem = `${string}rem`;
type vw = `${string}vw`;
type vh = `${string}vh`;

//Further possibilities
// type vmin = `${string}vmin`
// type vmax = `${string}vmax`
// type percent = `${string}%`
// type em = `${string}em`

export type Measurement = px | rem | vw | vh; //| vmin | vmax | percent | em
export type DefaultMeasurement = px;
