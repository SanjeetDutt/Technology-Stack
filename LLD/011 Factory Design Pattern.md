 Let suppose we are using a user service, which is using a database instance, and also create user method.
 ```java
 class UserService{
	 Database db;
	
	public Query createUser(){
		if(db instanceOf mySQL){
			return mySQLQuery; // Need to define
		} else if(db instanceOf noSQL){
			return noSQLQuery; // Need to define
		}
	}
 }
```

The above example violates open close principle, which say class should be open for extension but close for modification, but here is type of database increases. We have to modify the code.

Instead of the above code, we can use factory design pattern, in which we will move the create query method in parent class and called the method in child class.

![[factory DP.png]]

Point to observe here:
1. While creating a new database object, we are declaring variable db as database, which is an interface. Which means this variable can have any type of database (any class, which implement database interface).
2. Whenever we want to change the dependency from MySQL to any other database type, we need to simply change my as well to other database name
3. According to database interface definition, a database class should have a create query, which should return data type of query. Here query is also an interface which means any database can have an any type of query. Which means while defining the database class we can define what type of query this database will return.
4. Because all query will have an execute function, we need not to worry about executing a query.
By the above approach, we can follow open and close principal.

![[Pasted image 20240423215059.png]]


Further, we can implement the interface in an instruct class to have the common class definitions, which is then extended by further type of concrete classes.

Example: let's suppose we are developing react native button. the button will have similar kind of properties, but for different platforms, some of the properties will be different.

```java

interface Button{
	String text();
	void onClick();
	void border();
}

abstract class Button implements Button{
	void border(){...}
}

class AndroidButton extends Button{
	String text(){}
	void onClick(){}
}

class IOSButton extends Button{
	String text(){}
	void onClick(){}
}

interface Platform{
	Button button();
}

class Android implements Platform{
	Button button(){
		return new AndroidButton();
	}
}

class IOS implements Platform{
	Button button(){
		return new IOSButton();
	}
}

class Main{
	public static void main(){
		Platform platform = new IOS();
		Button button = platform.button(); //Clean code
	}
}
```
