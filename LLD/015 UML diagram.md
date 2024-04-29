-  Unified Modelling Language.
- iI is a way of communication with
	- Product manager, business team and clients to understand requirement and demo
	- Architect and engineering manager to discuss growth, scale and  get design approved
- it has some standard annotation, which help to understand relationship between various entities and their behaviours
- is classified under two categories
	1. Structural diagrams / Class Diagram.
	   - In this, basically, we discuss about and it structure.
	   - this diagram is made up of
		   - package diagram
		   - component diagram
		   - object diagram
	2. Behavioural diagrams / Use case Diagram.
	   - in this diagram, we discuss about how system will work
	   - it clearly represent what feature the system supports
	   - this diagram is made up of
	     1. Activities.
	     2. Sequences.
	     3. State.
# Use case diagram
This diagram specifies
- different feature and functions supported by the system
- who are the user

## Terminology used in use case diagram
### 1. System boundary.
- At represent the scope of the system
- It does not include any outsource feature
- it is represented by a rectangle

### 2. Use case.
- this includes feature, functionality, and their actions.
-  must always be a verb
- it is represented by an oval

### 3. Actual
- this mean people who use a particular use case
- must be a noun
- a stick diagram

### 4. Includes
- it indicates what functionality will be imported by the child feature from its parent feature.
- it represent by an arrow with text *includes* written in between
- the head of the arrow represent represent the child feature
- the tale of the arrow represent the parent feature

### 5. Extends
- eight indicate if a feature has multiple variant
- it is also represent by an arrow with text *extends* written in between
- the head of the arrow represent the main feature
- the tale of the arrow represent the extended / variant feature
### Example
![[Use case diagram.png]]

# Class Diagram
- Class diagram can be used to represent different entities. This can be represented by
	- ## Classes	
		- A class represented in rectangular box whose heading,  represent the class name
		- Further the box is partition into two boxes
			- The first box contain all the attributes of the particular class
				- It also do include reference of another class, which is for association
			- The second box contain all the functions of the class
		- Regardless of first and second box, all the name can be started by the following symbol, which represents
			- (Minus) ➖ represents private access modified
			- (Plus) ➕ represent public access modifier
			- (Hash) #️⃣ represents protected access modifier
		- Syntax to write attributes of a class
			 <access_modifier> <name(...params) : <return_type>
	- ## Interface
		- it is similar to class representation, but it do not have first box which contain attributes. And the name of interface will be en capsulated between two arrow symbol
		  Example : << Flyable >>
	- ## Abstract class
		- the representation of abstract class is similar to the concrete class
		  Only the difference  it is written in italic format
	- ## Enums / Enumeration
		- it has represented in a rectangular box with a heading as its name
		- the content of the box is comma separated values of the Enums
- Class diagram can be also used to represent represent relationship between entities. This can be represented by.
	- ## Implementing an interface
		- the implementation is represented by an arrow symbol
		- whose  head represent the concrete class and the tail represent the interface object?
	- ## Extending the class
	- ## Having an attribute of another class
	
#  Association
- It means joining or working with another object
- and design pattern, we joined two different entities so that we can establish a connection between them
- this can be done by adding the reference of another class in the class definition.
- Association is further classified into two different types.
	- ## Aggregation
		-  also called as  **weak association**
		- it contain the entity reference which having an independent existence
		- it is done by adding the reference of another class after initiation of this class
	- ## Composition
		- also called as **strong association**
		- it contains the existence of the another class. 
		- if this class doesn't exist, then the another class will also not exists
		- it is done by creating the instance on the initialising of this class

# Approach to solve design question
1. Get an overview.
	- it means align the thoughts with the owner
	- after this step, you must able to answer 
		  - what exactly exactly want me to design
		  - do I have to purchase the data?
		  - how do I interact with client?
			  - REST API
			  - CLI
			  - Hardcode
2. Gather and clarify the requirements.
	- it means suggest ideas, features and asked if needed to be supported.
	- very important to visualise the designs
	- it should cover all the edge case and future scope
3. design the system with obtained information
	- there can be various way to design a particular application.
	- and all of them can be correct as well.
	- there is no one particular solution to any given problem.
# Example of class diagram
![[Pasted image 20240429161747.png]]

# Relationship between class diagram and schema diagram
- last diagram used to represent their relationship between various classes which is further use designing an architecture code base
- schema design is used as a relationship between various tables, which is for the use to create the database
- for each class, which represent represent an entity, basically represent represents a table in schema design.
	- Where primitive attribute in the class represent the column of the table
	- Where non-primitive attribute which is used to represent represent association in class diagram will represent, represent the cardinality between two tables in schema diagram

# how to an interview?
- at least some of the requirement should be working and to end.
- If we able to deliver less feature which is working end to end will have more marks rather than many feature with broken piece of code
- ## Code structure
	- it become very important to follow a particular code structure while writing the code
	- the basic architecture be usually follow is called as MVC architecture. Where
		- M stands for model: which represented in class diagram.
		- V stands for view: which represent represent the user interface class.
		- C stands for controller: this will interact with client and trigger the business logic