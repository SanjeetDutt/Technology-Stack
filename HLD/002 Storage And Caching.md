- Storage are used, basically in all applications where we want to store our data
- Storage has to be decoupled from business logic
	- the reason to decouple business logic and storage are
		- Constant code deployment  will cause unavailability and storage should be protected from unavailability
		- Different specialised hardware or resources are required for database and compute
- we can connect one or multiple database storage to a one or multiple servers
	- but better way is to share the database storage among multiple server.
- to do the sharing between multiple server, we will again use a load balancer between server and  storage
	- ![[Pasted image 20240712211418.png]]
	- Disadvantage :
		- but by adding load balancer, we are increasing the network dependency which is unreliable nature. It can be down due to technical/physical problems
		- that the reason why we have to trade of between scaling of our system by decoupling application server layer and storage layer, but because of this, we are introducing network risk
		- this will increase the number of network calls / hops
			- hop occurs when a packet is passed from one network segment to the next
		- and whenever hops increases, will increase latency
			- latency is amount of time. We have to wait for our request to be respond.
			- let's suppose if Facebook's storage is set up in US and a user from India, try to add a post and which last for more than our the user experience will exponentially degraded
	- to overcome all the disadvantage due to latency, we have a mechanism called caching

# Caching
- Caching is the process of storing copies of files in a cache, or **temporary storage location**, so that they can be accessed **more quickly**
- the overall requirement of a caching is to reduce latency
- there are several way of doing caching
	- ## Client side /  in-browser caching
		- in this cache value will be stored in the client side
		- in this way, will be store those data which do not change over a long period of time
	- ## Content Delivery Network CDN 
		- this is another way to cache the data.
		- the data are basically stored in nearby server to the user
		- here we will store basically two type of data
			- very small size text data
			- are very big size meta data, such as image, video, audio blob, which are basically 
				- **static in nature** 
				- **shared with larger audience**
		- most use content delivery networks are
			- cloud flare
			- akamai
			- cloud point
			- fbcdn
	- ## Server side caching / Global Cache
		- requirement of server side caching are
			- assuming the example of chat GPT to be designed using stateless mechanism, we realise that if latency will be very high because of
				- database read time
				- network time
				- and computer time
			- but introducing state full mechanism, the latency will not be decreases as the new server will not store all the data in its memory.
			- to optimise this issue, we will introduce global cache memory in the application layer
		- advantage of using global cache memory
			- it will reduce the database, read and write time by using physical memory, which has very high read and write capability
			- it is basically a set of servers which are integrate with application layer to provide cache memory on the flight, which reduces network timing
		- drawback of using cache memory
			- Cache can always go stale
			- Limited in size
			- not always actual point of truth. Because actual data need to be stored in database layer.
		- to overcome the drawback we have cache invalidation strategy.
			- it basically says for how much of time cache will be stored in the memory
			- also known as TTL / time to live
			- whenever the data gets stored in cache, their expiration date is also get stored with it.
			- whenever we try to retrieve the cache memory, we will see the expiration date of the data.
			- if it passed, then we will collect the data from the database storage layer
				- in this, we will update the cache memory with the latest data and a new expiration date
			- if not, we will get the cache memory.
			- in the worst case scenario, the latency will remain safe, but end other scenarios, we have optimise the system to get request responded quickly
		- strategy to follow while writing data in cache
			- ### Write through cache
				-  in this process, we first write the data in the cache memory and then write in the actual database
				- in this way, the cache memory will be always up-to-date
				- the major drawback of this
					- compromises with data, if actual database server is down. As this will write in the cache memory, no data is permanently stored
					- write latency will be increased
			- ### Write back cache
				- in this process, B only write in the cache memory and later after some particular interval of time, we write the data from cache memory memory to actual database
				- in this way, cache memory will be always up-to-date and latency can be reduced
				- the downside can be data loss forever if  cache memory has been cleared without writing in actual database
			- ### Write around cache
				- in this process, we will be writing the data directly to the actual database. And after some periodic asynchronous manner, we will be writing the data to the cache memory
				- in this way, we can store the data in actual memory
				- but downside is cache, memory will not always be up-to-date
			- ### Cache eviction
				- Cache eviction refers to the process of removing data from a cache to make room for new or more relevant information
				- Type of cache evictions
					- FIFO = First in First Out
					- LIFO = Last in First Out (Rarely used)
					- LRU = Least Recently Used (Most commonly used)
![[Pasted image 20240726161303.png]]

| ![[Pasted image 20240726161338.png]] | Denotes Cache memory which can be shared by all the sever |
| ------------------------------------ | --------------------------------------------------------- |
# Case Study #1 : get post in Facebook by user ID
- Let's take an example of getting a facebook profile post by the user ID.
- in this, let's suppose 
	- we have developed distributed system to store the user and their post
	- we are using stateful load balancer, that's mean, every server will have only specific user data
	- similar to server, user data are segregated in the data layer as well
- to get the user and their post, we will simply query in the user server and get their whole post
```SQL
SELECT * FROM POST
WHERE User_Id = 107
LIMIT 20 OFFSET 0
ORDER BY time_stamp DESC
```

# Case Study #2: getting newsfeed in Facebook
- let's take an example of a getting the newsfeed in a facebook
- newsfeed is nothing but latest post made by the friends of a particular user
- the process will be
	- we will be calling the server to get the list of friends of logged in user
	- after getting the list, we will loop through the list of friends and get their latest feed
- the above process is good, but latency will be very high, and it will be totally depend upon number of friends
- instead of above process, we can  add a caching layer where we can store the latest post made by the user
- the process will look like
	- whenever a user make a post, we will be updating it in the global cache
	- once a request has made to get the latest newsfeed of logged in user
		- we will  simple get the friends list of the logged in user
		- and by using the global cash memory, we will get all latest post made by their friends
	- but the question is how much memory needed for cashing this huge data?
		- in real life server, hard disk size starts from 4 TB and goes up to 16TB 
		- similarly, the RAM can be very big as well.
		- sample calculation of memory size needed.
			- Facebook total user = 2 Billion
			- let's suppose, daily active user = 25% = 500M
			- let suppose, 5% of daily active user made post = **25M People post per Day**
			- let's suppose every people make average for post in a day = **100M Post per day**
			- calculating size of a post
				- post ID = 8B
				- user ID = 8B
				- Time stamp = 8B
				- meta data and other details = 70B
				- 300 characters on an average = 300B
				- Image or a video in a post = 30B (we will be storing the link to CDN)
				- therefore, total size of a post = **500B per post**
			- therefore, total size of post made by all user in a day = **50GB per Day**
			- total size of post made in a month = **1.5 TB per month**
		- 1.5 TB a month is a common size a server can have.
	- there are cases where to support different query  pattern, we may have to duplicate data
	- coding, not only speed up or radio Legacy, but in case makes system itself possible

# Sharding
- a method for distributing a **single dataset** across **multiple databases**, which can then be stored **on multiple machines**.
- the idea is that all my data may **not fit inside one machine**, hence we have to distribute our data and **store in pieces in** different machines
- ultimately shouting will lead to the creation of **cluster of a machine** together, storing the data
- ![[Pasted image 20240726164152.png]]
- one machine that store a piece of data called as **shard**
- therefore, Sharding is collection of shard which are
	- **mutually exclusive** = if we take one piece of data from a shard, it will be unique across all the shards
	- **collectively exhaustive** = if we take all the shards collectively, the data will occur only once
	- ![[Pasted image 20240726164713.png]]
- to access the data in a given shard, we can take the advantage of consistent hashing.
	- where the ID which are used to distribute the data among the different shard can be used as sharding ID / sharding key
- the major drawback in sharding is to run the joint query
	- if we want to try to join different table, which are on different shard. It will cause a major latency issue
	- to resolve this, we need to make different snapshot for different join queries
	- so to optimise it, the most important queries should be intra-shard and not inter-shard
	- **Intra-Shard** = the table we want to join is also available in the same server
	- **Inter-Shard** = the table we want to join is available in another server
	- whenever we try to do inter shard, we have to make a network call to another server via the other set of data exist. And making a joint between two different server over the network will take a lot of time. Hence latency will be increased.
	- but in case of inter-shard, if the data we want to join exist in the same server, then time taken between the network will be eliminated and latency decreased
	- but to achieve different types of joint. We cannot have all the data stored in the same server. hence we need to make a copy of data across multiple server with a different sharding key. this key will be function of queries we want to run.
	- let's suppose there are two queries and both are important queries and both are highly use.
		- achieve a proper architecture. We need to make 2 shards on based on the keys
	- but let's suppose there are five queries out of which one is only important,
		- hence, to achieve a proper architecture, we need to create only one shot and other four queries inter-shard accordingly

# Replication
- creating copy of transactional data
- it become important to make database server available
- let's suppose if we make only one copy of a database, and the database server crashes due to any reason. Our database server will be down until we restore our service.
- to get rid of it, we have to follow the process of replication of data
- the most common method of replication is **master slave replication**
- ## Master slave replication
	- in this process, we make one database as a master database, which is having an up-to-date information inside of it
	- and we copy the same data to another database, which act as reserve of the master database known as slave database
	- the number of slave assigned to the number of a master known as **replication factor**
		- 2:1 replication factor = two slave database is assigned to one master database
	- probability of server getting down
		- if replication factor is 0, means no slave has assigned. There will be high chances of server will get down
		- if replication factor is one, means one slave assigned to the master. And both machine has probability of getting down as 0.1 
			- then probability of getting whole architecture down = 0.1 X 0.1 = 0.01
		- if replication factor is 2, and probability of getting down = 0.1
			- then probability of getting whole architecture down = 0.1 X 0.1 X 0.1 = 0.001
		- therefore, as replication factor increases, probability of getting down of a server decreases exponentially.
	- writing mechanism in master slave replication
		- synchronous mechanism
			- in this, whenever data is written in master database, an  synchronous process initiated to write the data to slave database as well
			- this mechanism ensure proper up-to-date slave database
			- but because of synchronous process, latency increases
		- asynchronous mechanism
			- in this, whenever data is written in master database, and asynchronous process initiated to write data to the slave database
			- in this mechanism, we can ensure low latency
			- but data reliability is compromised because of chances of failure in asynchronous.
		- Quorum mechanism
			- in this, whenever data written in the master database, both synchronous and asynchronous process initiated
				- one slave is selected as main slave in which synchronous call is initiated
				-  for another slaves, asynchronous call is initiated
			- it is a midway between a synchronous and synchronous mechanism where data reliability and latency are not fully compromised
	- reading mechanism in master slave replication
		- in most of the architecture, the number of read is much greater than writing 
		- so to use all the system at their maximum capacity, reading the data usually done from the slave database
		- so as replication factor increases latency in read process decreases
	- so whenever we write the data in master slave replication, we usually write in master database.
	- but in terms of reading the data in master slave application, usually read the data from slave database.
	- by doing this way, overall latency can be decreases, but at the same time by selecting, correct writing mechanism reliability and consistency can also be increased

![[Pasted image 20240726184108.png]]