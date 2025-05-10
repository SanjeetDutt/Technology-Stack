# Difference between SQL and NoSQL
- SQL
	- Has fixed schema structure
	- Every data in it has a fixed size
- NoSQL
	- No fixed schema structure
	- Data's size can be vary
	- on updating any data, subsequent data needed to be moved. 
	- Will cause laggings
## WAL Write Ahead Log
- Method by which we can overcome the above issue
- Whenever any update query come, we will treat as write request 
- Example

| KEY | Value          |
| --- | -------------- |
| 101 | Jyoti          |
| 102 | Raja           |
| 103 | Reena          |
| 102 | Dev Raja Singh |
- Here we are not going back and update the 102 when new 102 request cam to update Raja to Dev Raja Singh
- We are just appending in the table
- By doing this way, write is very optimised now
- To read, get the last value in the table
	- Time complexity of read 
		- Best case scenario : O(1)
		- Average / Worst case scenario : O(N)
- Not space optimized
	- We are storing all version of update
- Delete optional
	- Generally know as Tombstone operation
	- it will be treated as another append operation with DELETED keyword

## Problem with Write Ahead Log
1. Read are way more unoptimized
2. Lot of redundancy in the storage
	1. Log file will always keep on growing
	2. One big DB file may not fit in the machine
	3. **Chunks** of the big file should be small enough to fit the main memory
		1. Chuck is a piece of data
		![[Pasted image 20250416135404.png]]

## Solution
- To solve the problem 2.2 and 2.3, we will size the upper limit of the chunk size in the secondary storage
	- The chunks will be stored as linked list
	- ![[Pasted image 20250416135819.png]]
	- At a particular time, 1 chunk will be active
		- Once the size of the active chunk crosses the limit, a new chunk created.
		- New chunk will be created, will be treated as active chunk and we will write in that chunk
		- ![[Pasted image 20250416135854.png]]
	- But if all chunk is present in the primary memory, their might be issue of memory spill over.
		- To resolve this, we will load only active chunk in the primary memory and other chunks in the secondary memory
		- ![[Pasted image 20250416140121.png]]

## Optimising the current process
- The above process clearly demonstrates how can we efficiently store data in primary and secondary memory
- But there are some possibility to optimise this process in granular level
- Following are the possible optimizations
	1. As the active chunk is loaded in the primary memory we can maintain unique data in a given particular chunk
	   This will make ensure in a given chunk the data will be unique
	2. Because the active chunk is loaded in the Primary memory, We can short the data so that finding a particular record can be faster
- The problem with above to optimization is secondary memory will not support any data structure which can handle above to optimizations
	- The possible solution to this is we can maintain a data structure in the primary memory and 
	  while writing it to secondary we will convert it into file written data structure
- The best data structures that can handle quick sorting and quick searching is **Balanced Binary Search Tree**

## Dry Run
### Writing a new record in new Database
1. Initially both primary and secondary memory will be empty
   ![[Pasted image 20250416141305.png]]
2. Whenever a new request came to add a particular record it will 
	1. Create a new chunk in the primary memory and mark it as the active chunk
	2. And will add the new data in the active chunk
	![[Pasted image 20250416141453.png]]

### Updating a record (Case 1 : when data is in the active chuck)
- Let's suppose there are lots of entry has been done and a request came to update a record which is currently in the active chunk
  Example : update 103to Rahul Soni
  ![[Pasted image 20250416141816.png]]
- In this case we will search for key id number and if exist in the active chunk we will update the record with the new one
  ![[Pasted image 20250416141915.png]]

### Updating a record in non active chunk
- Let's suppose there is a request came to update a record which is in secondary memory
  Example update 102 to Natasha Sharm
  ![[Pasted image 20250416142123.png]]
- In this case we will find the record in the active chunk and it does not exist then we will add the record in the active chunk 
  And because we are using balanced binary short tree, data will be automatically get sorted
  ![[Pasted image 20250416142338.png]]

### Reading the records from secondary chuck
- Let's suppose the data in our system looks like as follow and a request came to read a user id with number 50
  ![[Pasted image 20250416142558.png]]
- While reading a data we know following two things
	1. In a given chunk the data is sorted
	2. In a given chunk data exists only one time
- By knowing these two things we can easily apply binary search in a given chunk
- Dry running
	1. A request came to search user with id 50
	2. We will start looking into the active chunk as there is no user with ID50 we will move towards the secondary memory
	3. Because the primary memory is linked to chunk number three we will do binary search in the chunk #3 
	4. Because we will not able to find user we will move to and repeat the above step till we not able to find the id
	5. Once we receive the id we will respond to the request with the data
	6. If We not able to find the id then they will respond to not found response
- Key facts
	- If the record exists in the active chunk then response time will be very low
	- If the record exists in a very first chunk then we have to loop over through all chunks to fetch the record 
	  but while looping through every junk time needed will be low because we will follow binary search operation
	- The data stored in secondary memory in sorted fashion is also known as sorted string table (SST)
	- All the active chunks are also called as **Mem Tables** 
	- All the chunks which are in secondary memory are called as SS Tables

## Backup the primary memory
- As the primary memory is volatile there are some chances when data get losses when there is power loss or some other event happen
- To get the data stored in the secondary memory is not a valid case because we cannot store ongoing transition into secondary storage
- Instead we will back up all the operations happening on the active chunk.
	- This will be a simple Write Ahead Log in the secondary storage


# Compaction
- If we observe the whole architecture we will find the data is duplicated across multiple chunks in the secondary and even in the primary memory
- To get rid out of all the duplicate data we have a process of compaction
- Whenever we have less load on the server we can run a process which will remove all the duplicate data from the database
- In this following process take place
	1. Apart from active chunks we will bring few chunks from the secondary memory into primary memory
	2. We'll make an another chunk where we will start putting all the unique data which are currently available in the primary memory


## Problem of binary search in chunks
- Their still an issue let with searching a data. 
- As NoSQL can store any size of data, it will be difficult to get the middle element in the chuck. As data size can vary
- To resolve this issue we came with an approach of dividing every chunk into blocks.
- If the junk size is 100MB then we will make blocks of 64KB each to store record into it
- If any record is more than 64KB then we might need to update configurations but most record will fit inside 64KB
- While writing a particular record, if the size of record fit in the block, then we will write it in the block. 
- Otherwise we will write the record in the next block
- At the end we will maintain a simple hash table which will say which block have starting record key
- This hash table will sizes a very small so we can attach this table to every chunks
- This way it will optimise the read in the given chunk

## Time complexity of read operation in the NoSQL
- There can be two possibilities while reading a data
	1. Data can be present in the active chunk / Mem Table
	2. Data can be present in the Secondary memory

- If the data present in the active chunk, time complexity = O(Log N)
	- Because of Binary sorted search tree
- If the data present in the secondary memory then
	- First we have to search it from the active chunk, so time complexity = O(Log N)
	- Then we have to loop over through all chunks in the secondary memory 
		- let's say there are K chunks in the secondary memory
		- In each of we have to do binary search to get the records
		- Which total out total time complexity for reading from secondary memory to be O(K Log N)
	- So total time complexity will become O( (K+1) Log N)

## optimising is key present in NoSQL
- Please keep present can be used while reading her data or while creating a new key for upcoming record
- This implements a bloom filter to say whether key may exists or not
	- If it says key does not exist that means there is 100% chance that particular key does not exist in the database
	- But if it's a key may exists in the database means there are few chances that key might not present in the database
- So whenever a request came and filter say key does not exist we can blindly trust on it
- But if it says key does exist then we have to look through all the chunks to find the key
- In some of the case scenario it will reduce the searching to O(1)
