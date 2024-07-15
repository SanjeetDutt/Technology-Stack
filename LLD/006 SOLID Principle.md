# Introduction
1. Guild-line / Fundamentals
2. Better software design
3. Advantage of SOLID Principle
	1. Extensible
	2. Maintainable
	3. Readable
	4. Reusable
	5. Testable
	6. Modular 
		- We make our code as small component and fit them to build the application. Similar to modular kitchen. Where pieces are build somewhere and installed later in kitchen
## Abbreviation
*S*          Single Responsibility
*O*         Open and closed Principle
*L*          Liskov's Substitution
*I*           Interface Segregation
*D*         Dependency Inversion

## Example 1 : Design a bird
Design a software system which store attribute and some behaviour of bird
```java
// V0 version

class Bird{
	String name;
	int wings;
	String colour;
	float weight;
	boolean canFly;

	void fly(){}
	void eat(){}
	void makeSound(){}
}

Bird b1 = new Bird();
b1.name = "spraw";

Bird b2 = new Bird();
b2.name = "pigion";

b1.makeSound();
b2.makeSound();
// ISSUE: Pigion and Spraw make different sound.

//to fix this we can add if condition to the makeSound class
void makeSound(){
	if(name == "pigion"){}
	else if (name === "spraw"){}
}
/* Issue in writting this code is 
1. Not extensible
2. not reusable
3. not readble => not maintanable
4. not easy to test

THUS IT VOILATES "S" OF SOLID
*/
```

# Single Responsibility Principle (SRP)
Every code unit (means class / method / package) should have **1 responsibility** to take care of
There should be only one reason to change the code

## Identification of violation of SRP

1. Method that has lot of if-else. Exception if it part of business logic
   ```java
// THIS IS OK
   if(input == "..."){}
   else if(input == "..."){}
// THIS IS NOT
	if(type == "spraw"){}
	else if(type == "pigion"){}
```

2. Monster Method
	When a method is doing mare than what it is suppose to do.
```java
void saveUserToDb(User user){
	query = "....";
	Database db = new Database();
	db.start();
	db.connect()
	db.execute(query);
}	

// The able code is good but can better because it is doing a lot as the function name state. It is creating the query, connecting to db and then executing the query.

```

# Open closed principal
code base should be 
1. Open for extension 
	1. Easy to add new feature
	2. Should not require changing / modification good amount of existing code
2. Closed for modification

## Regression
It means by adding the new code the old code starting to fail

## Fixing the Bird class
- The bird class should be general not specific
- We can make the bird class an abstract class

```java
abstract class Bird
{
	String name;
	int wings;
	String colour;
	float weight;
	boolean canFly;

	void fly(){}
	void eat(){}
	void makeSound(){}
}

class Peigon extends Bird
{
	@override
	void makeSound(){};
}

class Spraw extends Bird
{
	@override
	void makeSound(){};
}
```

- Let suppose we are supporting the Penguin also, which can't fly then
```java
class Penguin extends Bird
{
	@override
	void fly(){
		// we can either throw and exception
		// Or can leave it empty
		// Both cannot be the solutions
		// Dont have surprize.
	}
}
```
Leaving the class, empty or throwing, an exception is never be a solution.

Instead of that, we can make two more intermediate abstract class, saying flying bird and non-flying bird. After which we can extend our end classes to.

But further, this way of doing is also not good because let's suppose we got a case where somebody bird can make noise and some cannot. In such scenario we need to make for intermediate class.

 that suppose we have n such scenario, then total intermediate class needed to be created will be 2^n.

Class : Blue print of an entity
Interface : Blue print of behaviour

```java
// to solve the issue we can
abstract class Bird {}
interface flyable{}

class Spraw extends Bird implements flyable{} // Will have fly()

class penguin extends Bird {} // will not have fly{}
```

# Liskov's Substitution
- Strong behavioural sub-typing
- Imposes some standard requirements on signatures
- Child class **should have all behaviours from parent class** without making any code changes.
- All child should behave as their parent
- *No child class should give a different / special meaning to parent class*
- If child class don't support parent definition then need to remove the definition from parent and put in another place
	- Child should not change parent class

# Interface Segregation Principle
***Segregate = to separate or to set apart***
all bird who can fly can also dance and vice versa 
By hearing this we can do following
```java
interface FlyAndDance{
	fly();
	dance();
}
```
That suppose in future, someone says fly and dance are two different entity and give following statement
- some bird can dance
- some bird can fly
segregating fly and dance from one interface would be difficult. 
So from the starting onwards, we will segregate all the different behaviours. But we will put all the common behaviour inside one interface, for example
```java
interface Authentication{
	login();
	signUp();
}
```
- Here login and signup are 2 interdependent activities and cannot be separated.
- But in case of fly and dance, they are not dependent on each other, so the behaviour can be segregated into two different interfaces.
- Interface should be kept as light as possible
- Ideally only one method

# Dependency Inversion
- No 2 concert class should be dependent on each other
- They can be dependent on each other via interface
	- Loosely coupling

```java
// Tightly coupled
class FlyingBehaviourA{
	makeFly(){...}
}

class Sparrow extends Birds implements Flyable{
	FlyingBehaviourA flyA = new FlyingBehaviourA()
	fly(){
		this.flyA.makeFly();
	}
}
```

- The above code is sparrow class is highly dependent on FlyingBehaviourA because
	- flying behaviour a is initiating inside of sparrow
	- sparrow class is directly calling makeFly function, which is a property of FlyBehaviourA
	- if in future, sparrow class do not follow FlyingBehaviourA then we need to change whole class definition to make the fix.
- instead of this, we can loosely couple our dependency by using an interface

```java
// Lossly coupled (Partial)
interface FlyingBehaviour{
	makeFly();
}

class FlyingBehaviourA implements FlyingBehaviour{
	makeFly(){...};
}

class Sparrow extends Birds implements Flyable{
	FlyingBehaviour flyA = new FlyingBehaviourA();
	fly(){
		this.flyA.makeFly();
	}
}
```

Who has complete loosely coupled component, we can use dependency injection as follow

```java
interface FlyingBehaviour{
	makeFly();
}

class FlyingBehaviourA implements FlyingBehaviour{
	makeFly(){...};
}

class Sparrow extends Birds implements Flyable{
	FlyingBehaviour flyA;
	
	Sparrow(FlyingBehaviour flyA){
		this.flyA = flyA;
	}
	
	fly(){
		this.flyA.makeFly();
	}
}
```

There is no direct dependency of sparrow class and FlyingBehaviourA. Whenever sparrow class is initiating, we can say which flying behaviour Sparrow should follow.

# Summary
- SOLID PRINIPLE
	- S = Single responsibility
		- Every class should have only 1 responsibility
	- O = Open close Principle
		- Open for extension
			- adding new feature
		- close for modification
			- Should not required a good amount of changes
	- L = Liskov's Substitution
		- Behavioural sub typing
		- some standards on signature
		- Child should have all behaviours from the parent
	- I = Interface Segregation
		- Define the way how interface should design
		- 1 interface should have one behaviour
	- D = Dependency Inversion
		- 2 class should not depend on each other
		- Related to coupling
		- Their should be some interface in between