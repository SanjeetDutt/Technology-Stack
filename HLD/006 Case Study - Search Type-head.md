- System design should follow following 4 steps
	- ## Minimum Viable Product - MVP##
		- List of **must have feature** be there when product is launched
		- feature without which product cant go out
	- ## Estimation of scale ##
		- Back of envelop calculation
		- what number looks like
		- Should able to answer
			- Is sharding is necesity
			- Is system is 
				- read heavy system 
					- number of Read >>> number of Write
				- write heavy system
					- number of Write >>> number of Read
				- read and write heavy system
					- number of Read === number of Write
	- ## Design tradeoff
		- Also know as 
			- Design choices
			- Design goals
		- The system should
			- High consistency or High Available
			- Latency
			- what level of data persistency 
			- is system will be state-ful or state-less
			- SQL or NoSQL
			- Caching or no caching
	- ## Design deep dive ##
		- API
		- System diagram -> draw all components
		- Data flow
# Design the system
## Initial Concept
- API calls
	- We will have 2 API calls
		1. getSuggestion(keyword)
			- This will give top 5 suggestion of the keyword
		2. getResutl(result) 
			- This will called when user hit the suggestion provided in the above suggestion list 
- We can have the have 2 hash map which do the following
	- Hash map #1 will store the search term **as key** and frequency of the search **as value**
	- Hash map #2 will store the keywords **as the key** and possible results as value  
- Process / Internal application
	- Whenever a request came in form of get suggestion we will look through the second hash map and return the top 5 suggestion
	- Whenever a request came in a form of get result we will do following
		- Increment the result frequency in first hash map by 1
		- If the frequency is greater than any of the result in second hash map we will update there as well

# Optimisation #1
- Issue
	- Due to consistent writing whenever a get result requests came, The system became a read and write heavy system
- Consideration
	- If we consider the result to be not consistent and can have a little delay in showing to use the we can think about batching
# Batching
- Whenever writes are the issue and our system can afford eventual consistency we can evaluate batching or batched writes
- Also known as Async updates
- Store the pending writes in the global cache
- Threshold is the amount of data to be store in global cache before writing in the DB
- This will help to write load in the DB
	- Help to change the system from Read + write system to Read heavy system

# Implementing batching
- We can create a global store in our server and will store the pending request in it with some random threshold
- Once the threshold limit exceeded then we will do right operation in our database
- By doing this it will make the system read heavy system instead of read and write heavy system
- While reading the records we will first refer to global cash if it exists then we will update the result and return to user unless we will read the records from database
- This will also improve read timing


# Optimization #2
- Based upon the architecture we design for our system it will be very difficult of new trending results to be get populated in suggestions
- Because the old results will have more frequency of search rather than the new one and will take time to get on top of older result
# Time Decay
- Time decay is a concept by which if anything is very popular at some point of time should get deteriorated time by time if not used recently

# Implementing time decay concept in optimization #2
- Given at a particular time of a day we will reduce the total frequency count by a given factor
- For an example if today some search result has 100 thousand as a frequency and we have time decay factor as 1.3
- Then by tomorrow search frequency will be 100/1.3 
- This will help new search results to topple over old search results