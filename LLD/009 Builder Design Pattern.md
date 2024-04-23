 builder design pattern come into the picture when we want to have different parameters in our constructor function.
 
![[Pasted image 20240423214741.png]]

![[Pasted image 20240423214809.png]]

```java
class Student{
	// possible number of constructor can be created from 3 data field = 7
	Sting name;
	int age;
	int phone;
	
	public void Student(String name){
		this.name = name;
	}
	
	public void Student(String name, int age){
		this.name = name;
		this.age = age
	}
	
	...etc
	
}
```

When number of constructor field increases in linear order known as telescopic constructor
To prevent the issue of telescoping constructor, we have **builder design pattern**
In this design pattern, we will
- our main class should have a function called get builder.
	- this should be a static function
		- we cannot call the get builder function after initialising the main class because we will lost the validation on object creation.
	- should return an instance of the builder class
- Builder class will have a similar data field as in main class. And all the data field will be public.
- user can set any field as per their choice
- the builder glass should have a build function. By which it should give a new instance of the main class and will also set those data fields in the main class
this builder classes commonly known as DTO, data transfer object. Which has only job to transfer a set of data from one place to another.

```java
public class Student {  
    String name;  
    Integer age;  
    Integer phone;  
  
    public Student(String name, Integer age, Integer phone) {  
        if(name == null || age == null){  
            throw new Error("Please provide a valid name or age");  
        }  
        this.name = name;  
        this.age = age;  
        this.phone = phone;  
    }  
  
    public static StudentBuilder getBuilder(){  
        return new StudentBuilder();  
    }  
  
}

public class StudentBuilder{  
    private String name;  
    private Integer age;  
    private Integer phone = null; // Default value  
  
    public Student build()  {  
        return new Student(name, age, phone);  
    }  
  
    public StudentBuilder setName(String name) {  
        this.name = name;  
        return this;  
    }  
  
    public StudentBuilder setAge(int age) {  
        this.age = age;  
        return this;  
    }  
  
    public StudentBuilder setPhone(Integer phone) {  
        this.phone = phone;  
        return this;  
    }  
}
```