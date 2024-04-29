# Decorators
**Decorator** is a structural design pattern that lets you attach new behaviours to objects by placing these objects inside special wrapper objects that contain the behaviours.
![[Pasted image 20240423222835.png]]

![[Pasted image 20240423224644.png]]

Example:
- let's suppose we are making a beverage interface, which is implementing in different types of beverages like espresso, latte, and cold coffee.
- each of these beverages will have their own properties
- now we are providing user to customise their beverage like adding extra milk or whip cream, etc
- to have these changes in the class we can either make all the combination possible classes, which is not very practical
- instead, we will use a decorator

![[Decorators.png]]

Another example
![[Pasted image 20240423224456.png]]

![[Pasted image 20240423224555.png]]

# Flyweight
**Flyweight** is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
![[Pasted image 20240423224759.png]]

As the above example, can truly demonstrate if we instantiate a new class for every particle of a game then it will cost around 21GB of total RAM. the alternate solution for this is to have the common data created once. and referencing it to every particle on its creation

![[Pasted image 20240423225024.png]]
