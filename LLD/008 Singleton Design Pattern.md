allow you to create a class for which only one object will be created.
Class will be acting as shared resource
For example, in an application, we want database connection should be initialised once and will be reused everywhere. In such case, single design pattern is very helpful.

![[Pasted image 20240423214709.png]]

- to make  singleton design following step should be followed
	- we need to privatise the constructor of a class
	- a static method, which will return the instance of the class
		- if class is not initialised, then this function will initialised and return the new instance of class
		- else will give older reference of initialised class

```java
// implementation of Singleton design pattern

class DbConnection{
	private static dbConnectionInstance = null;

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static DbConnection getInstance(){
		if(dbConnectionInstance == null){
			dbConnectionInstance = new DbConnection();
		}
		
		return dbConnectionInstance
	}
}

```

- The above sample code is not thread safe. it will cause an issue during synchronisation, or concurrent process.


# Eager loading
While defining the static variable, which is stored, the instance of the class we will instantiate the class. This will fix the synchronisation issue. Example.

```java
class DbConnection{
	private static dbConnectionInstance = new DbConnection();

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static DbConnection getInstance(){
		// this check is not needed anymore
		// if(dbConnectionInstance == null){
		//	dbConnectionInstance = new DbConnection();
		// }
		
		return dbConnectionInstance
	}
}

```

Issues with eager loading
1. application start time will increase increase drastically
2. Cannot give variable configure to the constant of the class


# Synchronised approach
Get rid of synchronisation, we can use synchronised starting method to get the instance of the class. Example

```java

class DbConnection{
	private static dbConnectionInstance = null;

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static synchronized DbConnection getInstance(){
		if(dbConnectionInstance == null){
			dbConnectionInstance = new DbConnection();
		}
		
		return dbConnectionInstance
	}
}
```

Issue with synchronised approach
1. application performance will be degraded because concurrency cannot be applied.


# Using Locks
By using locks, we can prevent the issue of synchronisation

```java 
// SOLOUTION #1 : putting lock inside of if condition
class DbConnection{
	private static dbConnectionInstance = null;

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static DbConnection getInstance(){
		if(dbConnectionInstance == null){
			lock();
			dbConnectionInstance = new DbConnection();
			unlock();
		}
		
		return dbConnectionInstance
	}
}

// this solution does not resolve the issue of synchronisation
// because in multithreading, a reference to data connection is stored
// and it is not get checked before initializing a new object
```

```java
// SOLUTION #2 : putting lock  outside of if condition
class DbConnection{
	private static dbConnectionInstance = null;

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static DbConnection getInstance(){
		lock();
		if(dbConnectionInstance == null){
			dbConnectionInstance = new DbConnection();
		}
		unlock();
		
		return dbConnectionInstance
	}
}

// this solution resolve the issue of synchronisation,
// but it is very similar to synchronised method
// hence not so useful
```

```java
// SOLUTION #3: putting double check
class DbConnection{
	private static dbConnectionInstance = null;

	// privatising the constructor
	private DbConnection(){...}

	// creating starting function with return class instance
	public static synchronized DbConnection getInstance(){
		if(dbConnectionInstance == null){
			lock();
			// we are putting double check here
			// taking advantage of above two solutions
			if(dbConnectionInstance == null){
				dbConnectionInstance = new DbConnection();
			}
			unlock();
		}
		
		return dbConnectionInstance
	}
}
```
