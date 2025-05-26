/**
 * Measurement units currently supports
 * px
 * em:       Relative to the font-size of the element (2em means 2 times the size of the current font)
 * rem:      Relative to font-size of the root element
 * vw:       Relative to 1% of the width of the viewport
 * vh:       Relative to 1% of the height of the viewport*
 * vmin:     Relative to 1% of viewport's smaller dimension
 * vmax:     Relative to 1% of viewport's larger dimension
 * % :       Relative to the parent element
 */
type px = `${string}px` | "0"
type em = `${string}em`
type rem = `${string}rem`
type vw = `${string}vw`
type vh = `${string}vh`
type vmin = `${string}vmin`
type vmax = `${string}vmax`
type percent = `${string}%`

export type Measurement =  px | em | rem | vw | vh | vmin | vmax | percent
export type DefaultMeasurement = px;
