
allow you to create a class for which only one object will be created.
Class will be acting as shared resource
For example, in an application, we want database connection should be initialised once and will be reused everywhere. In such case, single design pattern is very helpful.

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