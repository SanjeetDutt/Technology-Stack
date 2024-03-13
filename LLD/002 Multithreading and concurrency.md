# Introduction
- .dmg, .exe, .apk
- these are executable file
- code --compiled to--> executable files (downloadable and installable)
- after instal, it lie in hard drive
- after run the application, code come from hard disk to RAM
- process == program in execution
- 2.2GHz = 2.2 X 10^9 instructions per second

# Process and Threads

## Process
- programme in execution
- PCB ( Process Control Board) stores information about process, created by OS
```java
class PCB{
	pid
	List<Variable>
	register // address of register where calculation happen
	priority // priority of programe over other programe
	memoryDetails
	programCounter // current line of execution
	callStack
}
```
- Example of process while running MS Word
	- Display the output 	         <= process 1
	- Grammer Checker 		<= process 2
	- Auto saving 			<= process 3
	- Auto Suggestion 		<= process 4

- process can run independently but inter communication is not viable in process
	- communication will code in IPC Inter process communication, out of scope

## Threads
- Threads are not subprocess but related to a process
- Unit of CPU execution
- A thread is what a CPU actually executes
- A process can have 1 thread or multiple thread
	- Every process will have at least 1 thread
``` java
class PCB{
	pid
	priority
	memoryDetails
	// for independent calculation we have list of thread
	List<Threads> 
}
			
class Threads{
	// each tread will have independent programme counter.
	programCounter;
				
	// here we have fucntion stac instead of callStack
	// which means function of a class can in uniquelly allocated 
	// in different threads
	functionStack
}
```
			
- why multiple thread not multiple process
	- Data sharing in thread is much easier
		- we have same memory address in PCB which is used by threads
	- Creation of thread does not take extra memory as memory is already allocated in programme
		- memory creation are called as overhead
				
- every OS have CPU scheduler
	- decide what thread to be executed on the basis of
		- Resources
		- Priority
		- Time
	- CPU execute 1 thread at a time, but it do so fast it look like all thread are running parallel
		- it is know as context switching

## Single core VS Multi Core
- 1 core execute 1 thread at a moment
- 1 core = 1 chip = 1 thread at a moment
- quard core = 4 chip = 4 thread at a moment
- hyper threading = 2 threads in same chip
- example = i7 12650H (My laptop)
	 - having 10 core and 16 threads
		- 6 core (Hyper Threading) X 2.3GH = handle 2 thread at a time = 12 threads
		- 4 core 				   X 1.7GH = handle 1 thread at a time = 4 threads
		- sum of threads = 12 + 4 = 16 threads at a time


# Concurrency VS Parallelism
- case 1 : Single core system and switching between threads is not allowed ( thread 2 will start execution only after thread 1 complete )
	- at a given instance
		- partially complete thread = 1
		- ongoing thread = 1
- case 2 : single for system and switching between thread is allowed
	- at a given instance
		- partially complete thread = N
		- ongoing thread = 1
- case 3 : multi thread system and switching between thread is allowed
	- at a given instance
		- partially complete thread = N (number of threads)
		- ongoing thread = number of core or N (number of threads)

- for Parallelism we need multicore system
- for concurrency switching between the threads should allow (context switching should allow)

| OVERVIEW           | context switching is not allowed | context switching is allowed |
| ------------------ | -------------------------------- | ---------------------------- |
| Single core system | Sequential process               | Concurrency                  |
| Multi core system  | Parallelism                      | Concurrency and Parallelism  |

## Creating a Thread VS Thread Pooling
- issues in creating a thread by own is we cannot reuse it
	- causing over usage of resources
	- things will take time
- to overcome the issues, we have threaded pool option
	- it will manage the creation of new thread
	- Will have better resource handling
	- how it work
		- let's suppose we need 5 thread to the pool and let's suppose 7 task are assigned to perform
			- then threaded pool will allocate Task 1 to Task 5 who all existing thread
			- and once thread are available new task will be assigned to the thread

# Executors and Callable
Executor will only execute the task while will not only execute the task but also get return value from the task

Example of executor
```java
class PrintNumber implements Runnable{...}
```

```java
ExecutorService executorService = Executors.newFixedThreadPool(10);

for(i = 0 to 1000000000){
	PrintNumber printingTask = PrintNumber(i);
	executorService.execute(printingTask)
}
```
The task is completing very fast because we are not creating overhead
- Overhead means creation of excess thread
	- excess thread = threads, which do not work

Example of callable
```java
class _____ implements Callable<RETURN_TYPE>{...}
```

# Synchorization
- issues we are trying to resolve his synchronisation
	- let's suppose a variable has been declared which is used by two concurrent processes.
	- due to concurrency wrong value will be put inside of the variable
## Concept of critical section
Part of the code which is shared by the concurrent process
```java

int val = 0; // in concurrence, it is known as shared value

void functionA(int i){
	print("HELLO");
	val += i;       // START OF THE CRITICAL SECTION
	print("WORLD");
	val -= i;      // END OF THE CRITICAL SECTION
	print("BYE");
}

void functionB(int i){
	print("HEY");
	val *= i;       // SINGLE LINE OF CRITICAL SECTION
	print("BYE");
}

void functionC(int i){
	print("HEY");
	val *= i;                    // START OF CRITICAL SECTION
	print("PRINTING >> " + val); // END OF THE CRITICAL SECTION
	// because the shared value is used in printing purpose as well.
	// we can't take risk
}

```

## Race condition
- Race of completing the task
- Task A does not care whether task is completed or not and vice versa
 - two or motors enter the  critical sections at the same time
 - if you remove the condition, we can fix the issue of synchronisation

## Pre-emptiveness
We are moving from one task to another task before completing the previous task
Happens because of Context switching
Example
- let's suppose the we are in functionA and in printing the world, system decide to switch the context and start executing function C and execute all function C. After coming back to functionA the value for val -= i will be definitely wrong.
if we try to remove Pre-emptiveness concurrence will never happen

## Solution to fix synchronisation
To fix synchronisation, we can have a concept of MuteX
MuteX = deviated from two terms
- Mut = mutual
- eX = execution
means letting one thread to operate variable at a time in a given critical section.
Suppose one task is accessing the variable, It can lock the variable until the whole process is completed. Once the process is completed, it can unlock the variable and variable is ready to use by another task.
Meanwhile, when the variable is logged by other process/ task, other task need to wait till the variable is unlocked

```java
psvm(){
	Lock lock = new ReentantLock();
	Value val = new Value();
	// NEED TO PASS THE SAME LOCK TO THE ALL CONCURENT FUNCTIONS
	Adder adder = new Adder(val,lock);
	Substractor sub = new Substractor(val,lock);
}

class Adder implements Callable<void>{
	Value val;
	Lock lock;
	
	Adder(Value val, Lock lock){
		this.val = val;
		this.lock = lock;
	}

	void call() // Callable function impl with same return type 
	{
		lock.lock();
		// Critical section
		lock.unlocak();
	} 
}

class Substractor implements Callable<void>{
	Value val;
	Lock lock;
	
	Adder(Value val, Lock lock){
		this.val = val;
		this.lock = lock;
	}

	void call(){...} // Callable function impl with same return type
}

```

#  Synchronised
## Synchronised variable
Every object in Java comes with inbuilt locking mechanism that we can use to lock during concurrency
```java
Value val = new Value
functionA(val);

void functionA(Value v){
	synchronised(v){
		// operations in variable v
	}
}
```
### Drawback
Let's suppose we have 5 variable which are synchronised, then following code will be written
```java
synchronised(A){
	synchronised(B){
		synchronised(C){
			// ...etc
		}
	}
}
```
This particular way is difficult to read.

## Synchronised method
Every method in Java comes with synchronised keyword out of the box
```java
public synchronized void synchronisedCalculate() { 
	setSum(getSum() + 1); 
}
```
Example
```java
class Calculator{
	synchronized void add(){...}
	void multiplied(){...}
	synchronized void substract(){...}
}

Calculator A = new Calculator();
Calculator B = new Calculator();
```
-  A.add() will lock the whole A class
- use cases
	- Task1 A.add() Task2 A.add()
		- Task 2 will wait till Task 1 completed
	-  Task1 A.add() Task2 A.sub()
		- Task 2 will wait till Task 1 completed
	-  Task1 A.add() Task2 A.multiplied()
		- both task run concurrently
	- Task1 A.add() Task2 B.add()
		- both task run concurrently

