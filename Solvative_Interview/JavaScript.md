[Online JavaScript Compiler (programiz.com)](https://www.programiz.com/javascript/online-compiler/)
[Codeshare](https://codeshare.io/)

# Question - Primitive data type

What will be return of the following statements:

```javascript
typeof "John Doe" 
typeof 3.14 
typeof true 
typeof 234567890123456789012345678901234567890n
typeof undefined 
typeof null 
typeof Symbol('symbol') 
```

Solution - ETA(5 min)
```javascript
typeof "John Doe" // Returns "string" 
typeof 3.14 // Returns "number" 
typeof true // Returns "boolean" 
typeof 234567890123456789012345678901234567890n // Returns bigint 
typeof undefined // Returns "undefined" 
typeof null // Returns "object" (kind of a bug in JavaScript) 
typeof Symbol('symbol') // Returns Symbol
```

# Question - statically typed or a dynamically typed
Question : Is javascript a statically typed or a dynamically typed language
answer - (1 min )
Since javascript is a loosely(dynamically) typed language, variables in JS are not associated with any type. A variable can hold the value of any data type.
# Question - Hoisting
Expected output of the following command
```javascript
var A;
B = 3; 
console.log("VALUE OF A = " + A);
console.log("VALUE OF B = " + B);
var B;
A=4;
```

Solution - ETA (5 min)
VALUE OF A = undefined
VALUE OF B = 3

# Question == vs ===
what will be the result of following code
```javascript
var x = 2;
var y = "2";
console.log("x == y is ", x == y)
console.log("x === y is ", x === y) 

```
Solution - ETA (5 min)
x == y is  true
x === y is  false

# Question on + and -
```js
var x = 35
var y = "28"

console.log("x + y = ", x + y);
console.log("x ++ y = ", x + + y);
console.log("x - y = ", x - y);
console.log("x -+ y = ", x - + y);
console.log("x +- y = ", x + - y);
```

solution - ETA(10 min)
x + y =  3528
x ++ y =  63
x - y =  7
x -+ y =  7
x +- y =  7

# Question logical operation
```js
var x = 0;
var y = "30";
var z = null;

console.log("x && y && z = ", x && y && z);
console.log("y && z && x = ", y && z && x);
console.log("z && x && y = ", z && x && y);

console.log("x || y || z = ", x || y || z);
console.log("y && z || x = ", y && z || x);
console.log("z || x && y = ", z || x && y);

```

solution - ETA(10 min)
x && y && z =  0
y && z && x =  null
z && x && y =  null

x || y || z =  30
y && z || x =  0
z || x && y =  0

# Question Variable scoping
```js
function fn1(){
	A = "A1"; B = "B1"
	console.log("fn1 = ", A,B);
}

function fn2(){
	let A; var B;
	A = "A2"; B = "B2";
	console.log("fn2 = ", A,B);
}

const fn3 = ()=>{
	this.A = "A3";
	this.B = "B3";
	console.log("fn3 = ", A,B);
}

function fn4(){
    var A; let B;
    return function(){
        this.A = "AA";
        this.B = "BB"
        console.log("fn4() = ", A,B);
    }
}

var A = "A";
let B = "B";

console.log("INITIAL ", A,B);
fn1();
fn2();
fn3();
let fn = fn4();
fn();
console.log("FINAL ", A,B);
```

Solution: ETA(10 min)
INITIAL  A B
fn1 =  A1 B1
fn2 =  A2 B2
fn3 =  A1 B1
fn4() =  undefined undefined
FINAL  A1 B1

# Coding challenge Cloning the object
```js
const name = {
    firstName:"JAMES",
    lastName: "BOND"
}
const james = {
    id : 1,
    type : "agent",
    name
}

const sherloc = james;
sherloc.id = 2;
sherloc.type = "detective";

console.log("JAMES = ", james);
console.log("SHERLOC = ", sherloc);
```


# Coding challenge Fibonacci series
## Challenge 1
```js
/**
	Write a function to return first N Fibonacci number 
	Function should accept only one parameter (type int)
	and in rutun function should return an array of number
	
	example 1: 
	input 3
	return [0,1,1]

	example 2: 
	input 5
	return [0,1,1,2,3]

	example 3: 
	input 2
	return [0,1]
**/
```
ETA 
Brute force and solution discussion: 2 to 3 min
Code writing : 5 min
Discussion : 5 min
## Challenge 2
```js
/**
	Write a function to return last vaild Fibonacci number 
	Function should accept only one parameter (type int array)
	and in rutun function should return last valid fibonacci number
	
	example 1: 
	input [0,1,1]
	return 1

	example 2: 
	input [0,1,1,2,5]
	return 2

	example 3: 
	input [0,1,1,2,3,5,8,15,23]
	return 8
**/
```
ETA 
Brute force and solution discussion: 2 to 3 min
Code writing : 5 min
Discussion : 5 min
## Challenge 3
```js
/**
	Write a function to return sum of first n Fibonacci number 
	Function should accept only one parameter (type int)
	and in rutun function should return sum of n fibonacci number
	
	example 1: 
	input 3
	return 2
	solution [0,1,1], sum = 3

	example 2: 
	input 5
	return 7
	solution [0,1,1,2,3]

	example 3: 
	input 9
	return 54
	solution [0,1,1,2,3,5,8,13,21]
**/
```
ETA 
Brute force and solution discussion: 2 to 3 min
Code writing : 5 min
Discussion : 5 min
# Coding Challenge : Find non repeating number
```js
/**
Given an array of number in which all number are repeating except the one. Find the non repeating number.
Example : [1,2,3,4,5,4,3,2,1]
ans = 5
**/
```
ETA 
Brute force and solution discussion: 2 to 3 min
Code writing : 5 min
Discussion : 5 min

# Coding Challenge : Pascal Kebab Casing
```js
/**
Create a function which accept a multi parameter value and convert it into a pascal kebab casing string
input: multi parameter value each of type string
output: pascal kebab casing string

example 1
input : your-function-name-here("hello","world");
output: Hello-World

example 1
input : your-function-name-here("lorem","IPSUM","Is","dUMMY","text");
output: Lorem-Ipsum-Is-Dummy-Text

**/
```
ETA 
Brute force and solution discussion: 2 to 3 min
Code writing : 5 min
Discussion : 5 min