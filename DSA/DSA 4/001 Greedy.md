- solving the problem by using the best possible option at that time
- Used for optimisation of min / max related problems
- ![[Pasted image 20250414111952.png]]
- ![[Pasted image 20250414112034.png]]
- Explore all the options and decide the best answer out of all

### Example one
- There is a limited time sale going on for the toys
- A[i] => Sale end time for ith toy
- B[i] => Beauty of ith toy
- Time start with T=0 and it take 1 unit of time to but one time & toy can be bought if T < A[i]
- Buy toys such that sum of the beauty of toy is maximised
- ![[Pasted image 20250414112927.png]]
	- Idea #1 Pick the toy with maximum beauty first
		- ![[Pasted image 20250414113011.png]]
	- Most optimized answer
		- ![[Pasted image 20250414113303.png]]

- Buy everything in ascending order of time
	- ![[Pasted image 20250414113923.png]]
		- Here we will sort the array A and start buying all the product one-by-one 
		- Starting from product 0, beauty will be added as 5+2+7
		- Then product 3 cannot be added because Time = 3 and A[3] == 3, so we cannot buy product 3
		- Then we will but 4 and 5 with beauty of 4 and 5, 
		- but we cannot but 6 as time = 5 and A[6] == 5.
		- But beauty of 6 i.e. 8 is more than earlier bought product.
		- So we will revert our decision to maxsimise the answer.
		- So 1 with beauty 2 will be removed and 6 with beauty 8 will be added. 
	- **We have to correct the incorrect step that we have take in past.**
		- To find the minimum we have min-heep 