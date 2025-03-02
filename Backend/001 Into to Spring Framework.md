- It is a framework
- it helps us with 
	- Dependency Management
		- Let's suppose A is dependent on B and B is dependent on C and C is depend upon D. Spring framework will auto resolve all these interdependencies without us writing much code
		- The mechanism know as Inversion of Control
	- Config Management
		- This will help to setup different configuration on various enviroment
		- We will maintain config file
	- Spring MVC
		- Creating API's
		- Model View Controller
	- Spring Cloud
		- Microservice communicate with another microservice
	- Spring Security
		- Authentication & Authorization
	- Spring Boot
		- Build on top of Spring
		- Create and Host our application
		- Has build in
			- TomCat
			- REST
			- Spring MVC
# API
- Application programming Interface
	- Interface is contract or document or blueprint
- API is interface to connect with any web application
- We will call the API to make work done
- 2-way communication

# REST
- Representational State Transfer
- SOLID principle for API
- Best Practices
	- REST API should be defined around **Resources** which be **Affected**
		- /something-something <= Not a valid endpoint
		- /user or /product <= is a valid endpoint
		- Affect can be
			- Create
			- Read
			- Update
			- Delete
		- /read-user <= is not a valid REST endpoint as action is also attached
		- For action use API Methods
			- GET reading data
			- PUT Replace / complete update of record
			- PATCH Update few field
			- POST Create a new records
			- DELETE Delete the record
			- OPTION What are API are allowed
	- REST API should be stateless
		- Stateless means Independent and Self Sufficient
	- API should not have 1:1 mapping with DB Table, It should be 1:N Mapping
		- We should not limit the API to one table
	- Data Interaction
		- It will be inform of Request and Response
		- It is generally in form of JSON or XML

# Model View Controller - MVC
- ![[Pasted image 20250218124947.png]]
- We use MVC for
	- Scalable
	- Maintainable code
	- Lossy coupled

## View
- Whatever we are seeing on the screen

# How request get served into SpringBoot
![[Pasted image 20250218223234.png]]
1. Request came to our application
2. Request redirected to mapping handler with URL like \user and request payload and query parameter
3. Mapping handler will return with controller name which need to call
4. Request will be redirected to controller
5. Controller will return model and view
6. Response will be redirected to view resolver which has all views name and status code
7. respond with the view name
8. redirected to generate the view
9. Get the generated view
10. return view the response 
- View Resolver and View are obsolete as we are mostly using client side frontend
