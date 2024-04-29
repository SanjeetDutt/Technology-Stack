 basically, there are three types of behavioural design pattern
 1. Strategy design pattern.
 2. Observer design pattern.
 3. Command design pattern.

# Strategy design pattern
This type of design pattern help us to define a family of algorithm by putting each of them in a separate class and make their object interchangeable

For example:
In Google maps, we have different mode of transportation, such as car, bike, and walk. The algorithm which follows in these method will be different, but these are all are mode of transportation.

To design this type of scenario, we will be using an interface which will define the functions which will do the calculations. Further, this interface will be implemented by various classes.
Example:

![[behavorial design pattern.png]]

For scalability, we can add further more pathfinder class, which will define a unique way of finding the solution

# Observer design pattern
 This type of design pattern, let you define a subscription mechanism to notify multiple object about any event that happen to the object which is being observed.

Let's suppose we are designing a notification system in which we need to notify a particular group of people. There are two ways of designing things.
1. Either user have to always ask the server, Do they have any notification? This particular particular way will take a lot of resources.
2. Either sending notification to all the users. This will send the notification to those users as well, who are not likely to get this notification.
The solution lies in subscribing and unsubscribing a particular particular event. Similar to adding a event list in Java script

![[Pasted image 20240429123109.png]]

