HLD = high-level designs
- use to design overall systems and communication between them.

# How are user in internet reach to our system?
- the basic phenomena to reach our system via internet is through DNS
	- domain name server
	- basically, DNS have a map between domain name and their **static IP address**
		- there are basically two types of IP address
			- static IP address, which do not change with time. It will be provided by internet service provider ISP at an extra cost.
			- dynamic IP address, the IP address of the user will shift with time to time
	- whenever user, write a domain name in the URL bar, modern web browser will call DNS and get the static IP address of the website. once browser, get the static IP address, it will call the IP address to get the files to show in the browser.
	- Domain names are managed by ICANN (Internet Corporation for Assigned Names and Numbers) which is a non-profit organisation to handle the domain names
- DNS will get overwhelmed as every request on the internet will first need a domain name resolution.
	- this will make DNS server  take more time to respond with IP address.
	- following are the more issues which can occur due to this architecture
		- latency / RTT (Round trip Time) will be proportional to the distance
		- DNS machines will be overloaded
		- network chocking, as all the request on internet will first go through DNS server
- to resolve the issue, we need some good architecture which is easy to implement
	- it can be done by following architectural methods
		- distributed load balancing
			- in this, we will be having different machines based upon domain types.
			- like all domain name with com as extension will be stored in one machine and another machine will store all domain name with org extension
		- geo caching
			- it means we will storing data of a given region, which is most often used. 
			- If there is a domain which is rarely used in the region, we will try to prohibit that data to be in the regional server.
		- caching
			- we will try to cache the data on the line side as well

# Single point of failure
- the  architecture, in which, if a failure in one machine causes the failure of whole system known as single point of failure.
- let's suppose there is a one machine that act as a server, and if it is failed or down due to any reason, the whole server will crash
#  Horizontal vs Vertical scaling

## Vertical scaling
- vertical scaling, we usually increase the capacity of the system that we are using.
- it is done by either increasing the resource of the existing machine
- or replacing the existing machine with a new more capable machine
- Pros and cons
	- cannot support demand elasticity
		- in future, we need less capable system. We cannot downgrade our system easily.
	- it will cost you to implement
	- Single point of failure is not solved

## Horizontal scaling
- in horizontal scaling, we add similar or more or less capable system parallel to the existing machine
- later, the load on the server will be distributed among the new and the existing machines
- Pros and Cons
	- it is cheaper to implement as compare to vertical scaling
	- it is cheaper to maintain
	- support  better elasticity
	- solve single point of failure
# Load distribution among horizontal scaled system
- usually, this is done by a gateway / load balancer
	- in future, we will be discussing difference between gateway and a load balancer
- whenever a request from a server, load balancer will redirect the request to the appropriate server
## Type of load balancer
 they are basically two types of load balances
 1. Stateless load balancer.
	 - in this, redirection will be done on the basis of availability of the server, not the data in the request
	 - whenever a request comes to the load balancer, it will blindly redirect to available server
	 - for an example, in a basic calculator, if any request come to the load balancer, irrespective of the data that is in request, the request will be redirect to the available code server
	 - the algorithm which is used for redirection of the request are
		 - Round Robin
			- is a simple way to distribute client requests across a group of servers. A client request is forwarded to each server in turn. The algorithm instructs the load balancer to go back to the top of the list and repeats again. 
		- Least Connection First
			- Checks which servers have the fewest connections open at the time and sends traffic to those servers. This assumes all connections require roughly equal processing power.
		- Least Response Time
			- Averages the response time of each server, and combines that with the number of connections each server has open to determine where to send traffic. By sending traffic to the servers with the quickest response time, the algorithm ensures faster service for users.

2. State-full load balancer.
	- in this, redirection will be done on the basis of the data in the request.
	- whenever a request, come to the load balancer, the load balancer will evaluate to which server this request to go.
	- for an example in chat GPT, if a prompt history of a user stored in server, a and that user will prompt and another command, the request should go to the server, which already have the prompt history not to the server, which is new to the prompt
	- this will reduce the RTT
	- this is also called as **SHARDING**
		- it means redirecting the request to the appropriate server based upon an identification
	- the algorithms are used to redirect the request are
		- mapping of the request
			- in this, we will be making a hash map of an identification key with the server name map in a variable
			- whenever the request come, we will extract the identification key from the request and redirect it to the respective server
		- range base sharding
			- in this, we will make arrange of ID's and will do redirection on the basis of that
			- for an example ID from 1 to 1000, will go to server one, and so on
		- module based sharding
			- when this we will be following a formula
				- ID (mod) N
					- ID from the request
					- N = number of server
			- in this method, scale up and scale down of machine will handle automatically
		- **Consistent hashing**
			- it is the state full load balancing technique
			- we are looking to reduce chaos caused by machine going down or coming up
			- a distributed hashing scheme that operates independently of the number of servers or objects in a distributed hash table by assigning them a position on an abstract circle, or hash ring
			- difference from modulo based shouting and consistent hashing
				- whenever a server goes up or goes down, it directly affect all the data by changing their server address. Whereas in consistent hashing, whenever a new server is added, a set of data will be affected by changing their server address, and whenever server is going down again, a few data will be affected
			- for example
			  ![[Pasted image 20240712143313.png]]
				- the above example, we will follow clockwise circulation to locate their server address
					- harsh will referred to node 1
					- Kamal and Ram will referred to node 2
					- Sam and Raj will refer to node 5
					- and Rohit will refer to node 3
				- if suppose a new nod is added between Ram and Kamal, then only Kamal server address will be changed, and other data will be kept same
				- if for an example, node 5 will down the server address for Sam and Raj will be changed
			- cascading failure
				- failure can happen in consisting hashing as well
					- if a server is failing due to heavy load that heavy load will be transferred to the subsequent server as well
					- there will be high probability chances, the second server will fail and consecutively. All the server will start failing
					- this is known as cascading failure
				- the solution for  this type of failure is
					- solve the issue, we can insert a proxy server address, which refer to actuals server
					- ![[Pasted image 20240712203653.png]]
					- Here A' stands for proxy server address to A
					- whenever an actual server fail, the load of the server will be automatically distributed between other available servers
					- this will prevent us from cascading failure

# Complete Architecture so far
![[Pasted image 20240712205144.png]]