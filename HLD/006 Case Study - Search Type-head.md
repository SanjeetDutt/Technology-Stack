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