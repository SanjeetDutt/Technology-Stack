 # Generics
 Parameterised the variable/property/method/function type
 - generic only available during compilation at get converted into raw type during run time
 - it is used for failsafe code.
```java
List<Integer> numberList = new ArrayList<>();

class ArrayList<D> { // Parameterised the type of object in the list
	push(D data){...}
	....
}

```

How to use Generics
```java
class Animal {...}
class Dog extends Animal{...}

Animal a = new Dog(); // Allowed in java

List<Animal> aList = new List<Dog>(); // Not allowed in java
// No one told how List<Animal> is related to List<Dog>
// We only know relation between Animal and Dog

Dog dog = new Dog();
List<Animal> bList = new List<Animal>();
bList.push(dog); // It is allowed though we know how Animal and Dog are related.

```

```java
// We can write a function like
void doSomething (List<T extends Animal>){...}
void doSomething (List<T implements Animal>){...}
```


# Collection API

![[Pasted image 20240314183809.png]]

- List : sequence of element and uses index to insert and search
	- Array List is not thread safe
	- Linked list is also not thread safe
	- Linked list can be used as doubly link list
- Deque implement linked list and **it is a threat safe**
	- popular implementation of Deque are
		- Vector : similar to array list
		- Stack : first in last out
- Set 
	- not thread, safe
	- no order confirmation
	- Constant time for add remove and search operation
	- only have unique values
