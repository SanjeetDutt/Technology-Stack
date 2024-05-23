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

```
Given a sorted array of integers **A** of size **N** and an integer **B**,   
where array **A** is rotated at **some pivot** unknown beforehand.  
  
For example, the array [0, 1, 2, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2].  
  
Your task is to search for the target value B in the array. If **found**, return its **index**; **otherwise**, return **-1**.  
  
You can assume that **no duplicates** exist in the array.  
  
**NOTE:** You are expected to solve this problem with a time complexity of **O(log(N))**.

  
  
**Problem Constraints**  

1 <= N <= 1000000  
1 <= A[i] <= 109  
All elements in A are **Distinct**.

  
  
**Input Format**  

The First argument given is the integer array **A**.  
The Second argument given is the integer **B**.

  
  
**Output Format**  

Return index of B in array A, otherwise return **-1**

  
  
**Example Input**  

Input 1:

A = [4, 5, 6, 7, 0, 1, 2, 3]
B = 4 

Input 2:

A : [ 9, 10, 3, 5, 6, 8 ]
B : 5

  
  
**Example Output**  

Output 1:

 0 

Output 2:

 3

  
  
**Example Explanation**  

Explanation 1:

Target 4 is found at index 0 in A. 

Explanation 2:

Target 5 is found at index 3 in A.
```

```
Given a sorted array of integers A of size N and an integer B,   
where array A is rotated at some pivot unknown beforehand.  
  
For example, the array [0, 1, 2, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2].  
  
Your task is to search for the target value B in the array. If found, return its **index**; otherwise, return -1.  
  
You can assume that no duplicates exist in the array.  

  
  
Problem Constraints

1 <= N <= 1000000  
1 <= A[i] <= 109  
All elements in A are **Distinct**.

  
  
Input Format

The First argument given is the integer array **A**.  
The Second argument given is the integer **B**.

  
  
Output Format

Return index of B in array A, otherwise return **-1**

  
  
Example Input

Input 1:

A = [4, 5, 6, 7, 0, 1, 2, 3]
B = 4 

Input 2:

A : [ 9, 10, 3, 5, 6, 8 ]
B : 5

  
  
Example Output

Output 1:

 0 

Output 2:

 3

  
  
Example Explanation

Explanation 1:

Target 4 is found at index 0 in A. 

Explanation 2:

Target 5 is found at index 3 in A.
```

```
Given an integer array **A** containing **N** distinct integers, you have to find **all the leaders** in array **A**. An element is a leader if it is **strictly greater than** all the elements to its **right side.**  
  
**NOTE**: The rightmost element is always a leader.

  
  
**Problem Constraints**  

1 <= N <= 105  
1 <= A[i] <= 108

  
  
**Input Format**  

There is a single input argument which a integer array **A**

  
  
**Output Format**  

Return an integer array denoting all the **leader elements** of the array.

  
  
**Example Input**  

Input 1:

 A = [16, 17, 4, 3, 5, 2]

Input 2:

 A = [5, 4]

  
  
**Example Output**  

Output 1:

[17, 2, 5]

Output 2:

[5, 4]

  
  
**Example Explanation**  

Explanation 1:

 Element 17 is strictly greater than all the elements on the right side to it.  
 Element 2 is strictly greater than all the elements on the right side to it.  
 Element 5 is strictly greater than all the elements on the right side to it.  
 So we will return these three elements i.e [17, 2, 5], we can also return [2, 5, 17] or [5, 2, 17] or any other ordering.

Explanation 2:

 Element 5 is strictly greater than all the elements on the right side to it.  
 Element 4 is strictly greater than all the elements on the right side to it.  
 So we will return these two elements i.e [5, 4], we can also any other ordering.
```

```
You are given an array **A** of integers of size **N**.

Your task is to find the equilibrium index of the given array

The equilibrium index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes.

If there are no elements that are at lower indexes or at higher indexes, then the corresponding sum of elements is considered as 0.

**Note:**

- Array indexing starts from 0.
- If there is no equilibrium index then return -1.
- If there are more than one equilibrium indexes then return the minimum index.

  
  
**Problem Constraints**  

1 <= N <= 105
-105 <= A[i] <= 105

  
  
**Input Format**  

First arugment is an array A .

  
  
**Output Format**  

Return the equilibrium index of the given array. If no such index is found then return -1.

  
  
**Example Input**  

Input 1:

A = [-7, 1, 5, 2, -4, 3, 0]

Input 2:

A = [1, 2, 3]

  
  
**Example Output**  

Output 1:

3

Output 2:

-1

  
  
**Example Explanation**  

Explanation 1:

i   Sum of elements at lower indexes    Sum of elements at higher indexes
0                   0                                   7
1                  -7                                   6
2                  -6                                   1
3                  -1                                  -1
4                   1                                   3
5                  -3                                   0
6                   0                                   0

3 is an equilibrium index, because: 
A[0] + A[1] + A[2] = A[4] + A[5] + A[6]

Explanation 1:

i   Sum of elements at lower indexes    Sum of elements at higher indexes
0                   0                                   5
1                   1                                   3
2                   3                                   0
Thus, there is no such index.
```


```
You are given with an array in which all values are repeting twice except one. Find the non repeting number
```