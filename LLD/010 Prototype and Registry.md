# Prototype
Prototype coming into the picture when we need to **create a copy of the object**
In standard, if you want to copy the object, there are two ways to copy it

![[Pasted image 20240423214932.png]]

![[Pasted image 20240423214950.png]]

1. Referential copy / shallow copy.
```java
// shallow copy
Student s1 = new Student();
Student s2 = s1;
```

2. Definition copy / deep copy. 
```java
// deep copy
Student s1 = new Student()
Student s2 = new Student()
s2.setName(s1.getName())
```

 the limitation of the above method are
 - whenever we want to create the copy of the object object, user need to know the complete class definition
- code will repeat whenever want to create a copy

The ideal solution for this should be, copying the object should be outsource to the object itself.

```java
Student s1 = new Student();
Student s2 = s1.copy();

class Student {

	Student copy(){
		// it will return a new instance of student class with 
		// values copied to the new class
	}
}
```

Further more, the copy function can be overwritten by the child class for better cloning
It is very similar to clone interface in Java

# Registry
The concept of registry has following objectives
1. It act as a store where we can create a copy of an object, which can be used in other scenario as well. For example, on the start of a game, we can describe some basic properties of the user. But once the app started and we need multiple users either bot or real user, we can call the registry to give us a basic class with some initial data in it and we can customise our user on top of it.
2. Point to be noted: we will never change the definition of the class object once it added to the registry
3. Registry act as a cached memory.