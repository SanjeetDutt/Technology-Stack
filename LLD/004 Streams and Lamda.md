# Functional Interface
Interface which only have one abstract method
	Commonly known as **SAM** (**Single Abstract Method**)
Example
- Runnable interface : run()
- Callable interface : call()
- Comparable : CompareTo()
- Comparator: compare()

# Lamda
Lambda helps to write functional interface implementation in very easy manner
We can write code without lambda as well
Lambda help to write code in better way in syntactical way

Example 1
```java

class Student {...}

psvm(){
	// Creating a list of students
	List<Student> studentList = new ArrayList<>(List.of(
		new Student(1,"a"),
		new Student(2,"b"),
		new Student(3,"c"),
	))

	//Collection.sort expect 
	//   1. List of Object
	//   2. Comparator function
	// As we know comparator function implement comparator interface
	// Which is functional interface (i.e. having only one function)
	// So instead declaring whole class, we use short hand, lamda function
	// Lamda function syntax is (...parameter)->{} 
	// Similar to arrow function in JS 
	Collection.sort(studentList, (Student a, Student b)->{
		// Here comparator interface expecting 2 parameters.
		return a.name.compareTo(b.name)
	})


}
```

Example 2
```java

Runnable = ()->{
	sout("Hello world : " + THread.currentThread().currentName());
};

Thread thread = new Thread(r);

//----or----

Thread thread = new Thread(()->{
	sout("HELLO WORLD FROM ANOTHER THREAD");
})
```

# Streams API
- stream = Flow / Sequence
- work on the sequence of data
	- lazy evaluation
![[Pasted image 20240316164437.png]]
Basically stream API execute a piece of food on the data which are in pipeline. It is similar to the for and other loops, but the basic difference is in those loops is all the data are stored in the RAM until the whole iterations completed, but stream API let's suppose we have 1 million of a data which is calling from the database, the function will be only execute to those data which are currently in the memory later while executing the function on other data may be this data can be destroyed by the garbage collector so it is a ongoing process every time.

Streams have two sets of functions
- **Intermediate function**
	- intermediate function does not execute until a terminal function is invoke
	- they are only executed until a result of processing is actually needed
	- commonly used intermediate methods are
		- filter
		- shorted
		- distant
		- map
		- limit
	- intermediate function **return another stream** as a result, that's why they can chained together to form a pipeline operation
- **Terminal function**
	- terminal operation typically return a single value
	- commonly used terminal function are
		- collect, forEach, reduce
		- Count, min, max
		- findAny, findFirst, anyMatch, allMatch, noneMatch
		- toArray
	- because terminal function return a single value they cannot be chained together

```java
psvm(){
	List<Student> studentList = new ArrayList<>(List.of(
		new Student(1,"a"),
		new Student(2,"b"),
		new Student(3,"c"),
	))

// Printing data with stream
	Stream<Student> studentStream1 = studentList.stream(); 
	//stream() will return stream object.
	studentStream1.forEach((std)->{sout(std.name)})

// Filter the data using stram where marks > 60
	Stream<Student> studentStram2 = studentList.stream(); 
	List<Student) studentMoreThan60Marks = studentStram2
		.filter((std) -> std.marks > 60) // Similar to JS
		.collect(Collectors.toList()); // Return List of stds.

//Count total marks using stream
	int sum = studentList.stream()
		.reduce(0, (currentSum, std)-> currentSum + std.marks);
		// Here currentsum = running sum 
		//.     0 = initial value of currentSum

//get max marks using stream
	int sum = studentList.stream()
		.reduce(Integer.Min_value, (maxValue, std)-> {
			return Math.max(maxValue, std.marks)
		});
		
}
```