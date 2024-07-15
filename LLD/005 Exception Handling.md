# Exception
Unwanted / Unexpected behaviour that happen during the execution of program 
Type of exceptions
- checked exception
	- it means exceptions are coming not because of bad code.
	- it can be connection lost, server crash, or anything else
	- need to specify in a function name that exception can be thrown
	- example: ClassNotFoundException
- unchecked exceptions
	- it means exception are coming  due to bad code.
	- Very bad thing
	- for example, writing a code such as 1/0. Which always throws an  Arithmetic exception.
	- need not to be added in the function name because it needed to be fixed in any cost.
	- example: OutOfBoundException, RuntimeException
## Throw vs Throws
- Throw
	- Throwing an exception when a function is executing
- Throws
	- it means class can throw an exception which needed to be handle in the place of use of the particular particular class
	- further the class where the function is used, which says it can throw an exception. It can also handle it or further throws the same exception error
## Errors
Error is the subclass of throwable that indicates serious problem that a reason why application should not try to catch. Most such error are abnormal condition.
Example: stack overflow error, out of Memory error
## Try and Catch

```java
try{
	doSomething();
} catch (ClassNotFound ex){
	// Handle class not found exception
} catch (EvenNumberException ex){
	// Handle even number exception
}
```

Error cannot catch in try catch
## Finally
That piece of code which will definitely run
```java
try{
	someThingToDo();
} catch(Exception ex){
	// handle the exception
} finally{
	//If not thrown from catch will definitly run
}
```