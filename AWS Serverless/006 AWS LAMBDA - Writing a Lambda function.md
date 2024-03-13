2 ways of writing
1. Simple callback function
		export const handler = (event, context, callback)=>{
			.....
			callback(...)
		}
		not preferred now a days
2. Asynchronous function
		export const handler = async (event, context)=>{
			.....
			return ....
		}
		preferred now a days

# Parameter in lambda function
## Event
- it has input parameter  or input variables that we want lambda function to act on
- the structure of the event is depend upon the type of event source
- event sources can be synchronous or asynchronous event
- example of synchronous event
	- API Gateway
	- Incoginito 
	- SDK 
- example of asynchronous event
	- S3 Bucket
	- SDK
- we can choose the invocation type in SDK
- events can be further classified into
	- pushed-based event
		- who is the event into the land of function to invoke lambda function
		- example : 
			- s3 event
			- API event
	- pulled-based or polled-based event
		- lambda look into the stream of events to involve the function
		- example
			- dynamo DB event
			- kenisis 
			- S-Q-S event

## Context
- Provide some useful details of runtime environment in which lambda is running.
- example
	- Time left for timeout
	- current  invocation ID
	- environment variables
	- logging information

[Creating first lambda function](obsidian://open?vault=Technology-Stack&file=AWS%20Serverless%2Fcoding%2F001_Greating.js)
