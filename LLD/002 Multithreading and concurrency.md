# Introduction
- .dmg, .exe, .apk
	- these are executable file
	- code --compiled to--> executable files (downloadable and installable)
	- Known as program
- after instal, it live in hard drive
- after run the application, code come from hard disk to RAM
- **PROCESS** are nothing but **program in execution**
- 2.2GHz = 2.2 X 10^9 instructions per second
	- 10^9 is know as Giga

# Process and Threads

## Process
- Programme in execution
	- Top level execution container
	- Separate memory space
- PCB ( Process Control Board ) stores information about process, created by operating system OS
	- PCB = ![[Pasted image 20240714091403.png]]

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
	- Grammar Checker 		<= process 2
	- Auto saving 			<= process 3
	- Auto Suggestion 		<= process 4

- process can **run independently** but inter communication is not possible in process
	- communication will code in IPC Inter process communication, out of scope

## Threads
- Threads are not subprocess but related to a process
	- Runs inside of a process
	- having shared memory space
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
		- Excessive memory creation are called as **overhead** 
				
- Every OS have CPU scheduler
	- decide what thread to be executed on the basis of
		- Resources
		- Priority
		- Time
	- CPU execute 1 thread at a time, but it do so fast it look like all thread are running parallel
		- it is know as **context switching**

```java
Thread.currentThread().getName(); // Getting current thread name
```

## Single core VS Multi Core
- 1 core execute 1 thread at a moment
- 1 core = 1 chip = 1 thread at a moment
- Quad core = 4 chip = 4 thread at a moment
- hyper threading = 2 threads in same chip
- example = i7 12650H (My laptop)
	 - having 10 core and 16 threads
		- 6 core (Hyper Threading) X 2.3GH = handle 2 thread at a time = 12 threads
		- 4 core 				   X 1.7GH = handle 1 thread at a time = 4 threads
		- sum of threads = 12 + 4 = 16 threads at a time

# Concurrency VS Parallelism
- Case 1 : Single core system and switching between threads is not allowed ( thread 2 will start execution only after thread 1 complete )
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

- For Parallelism 
	- we need multicore system
	- It means two process running parallel with one thread in each.
	- Here context switching is not allowed
- For concurrency 
	- We do not need multi core system
	- It means only one process running with multiple thread in it.
	- Switching between the threads should allow (context switching should allow)

| OVERVIEW           | Context switching is not allowed | Context switching is allowed |
| ------------------ | -------------------------------- | ---------------------------- |
| Single core system | Sequential process               | Concurrency                  |
| Multi core system  | Parallelism                      | Concurrency and Parallelism  |

## Thread VS Thread Pooling
- issues in creating a thread by own is 
	- we cannot reuse the thread again (lost in space)
	- causing over usage of resources (as we cannot reuse it)
	- things will take time (we are creating thread every time)
- to overcome the issues, we have threaded pool option
	- it will manage the creation of new thread
	- Will have better resource handling (it will reuse the thread)
	- how it work
		- let's suppose we need 5 thread to the pool and let's suppose 7 task are assigned to perform
			- then threaded pool will allocate Task 1 to Task 5 who all existing thread
			- and once any thread is available, a new task will be assigned to the thread
POINT TO NOTE: Thread pooling has nothing to do the context switching.

```java
/**
*      Example for simple thread creation without pooling
**/

public class Client {  
    public static void main(String[] args) {  
        System.out.println("Application stating...");  
        RandomClass randomClass = new RandomClass();  
  
        Thread thread = new Thread(randomClass);  
        thread.start();  
  
        System.out.println("Application stopped...");  
    }  
}

// To run the class in a thread, class should impl. Runnable or Callable
public class RandomClass implements Runnable{  
  
    public RandomClass(){  
        System.out.println("RANDOM CLASS CREATED...");  
    }  
    
    @Override  
    public void run() {  
        System.out.println("RUNNING RANDOM CLASS");  
    }  
}

//OUTPUT:
// Application stating...
// RANDOM CLASS CREATED...
// Application stopped...
// RUNNING RANDOM CLASS <- running in different thread
```
### Executor
- Executors makes our easier by do thread pooling for us.
- Executor will only execute the task 
- It will not only execute the task but also get return value from the task
- Executor manages the assignment of task to threads within the thread pool.
- It also provide the **Waiting Queue** which holds the tasks that couldn't be assigned to threads in the thread pool.

```java
// Example of executors
class PrintNumber implements Runnable{...}

// Creating a service of 10 thread pool
ExecutorService executorService = Executors.newFixedThreadPool(10);

for(i = 0 to 1000000000){
	PrintNumber printingTask = PrintNumber(i);
	executorService.execute(printingTask)
}
```

The task is completing very fast because we are not creating overhead
- Overhead means creation of excess thread
	- excess thread = threads, which do not work

```java
/**
*      Example for simple thread creation with pooling
**/

public class Client {  
    public static void main(String[] args) {  
        System.out.println("STARTING APPLICATION...");  
        RunnableClass randomClass = new RunnableClass();  

		//Creating a process which can have 5 thread in it.
        ExecutorService executorService = Executors.newFixedThreadPool(5);  
        executorService.submit(randomClass);// Adding a executable class
  
        System.out.println("STOPPING APPLICATION...");  
    }  
}

// To run the class in a thread, class should impl. Runnable or Callable
public class RunnableClass implements Runnable{  
  
    RunnableClass(){  
        System.out.println("RUNNABLE CLASS CREATED....");  
    }  
  
    @Override  
    public void run() {  
        System.out.println("RUNNABLE CLASS RUNNING....");  
    }  
}

//OUTPUT:
// STARTING APPLICATION...
// RUNNABLE CLASS CREATED....
// STOPPING APPLICATION...
// RUNNABLE CLASS RUNNING....
```

In the above example the process will still continue to run, because we didn't specify either the process is complete or not. To explicitly say either the process is complete or not, we need to add shut down function.
There are two type of shut down function
1. Simple shut down : which will close the process once all the thread are processed and completed
2. Shut down now : it will terminate the process instantly and will return the list of threats which are incomplete.

Source Code : [[LLD/SCALAR_LLD/src/main/java/in/sanjeetdutt/M001_Concurency/P004_Thread_Pooling/Client.java|Client]]
```java
// example with shut down function
public class Client {  
    public static void main(String[] args) {  
        System.out.println("STARTING APPLICATION...");  
        RunnableClass randomClass = new RunnableClass();  
  
        ExecutorService executorService = Executors.newFixedThreadPool(5);  
        executorService.submit(randomClass);  
        executorService.shutdown();  
  
        System.out.println("STOPPING APPLICATION...");  
    }  
}
```

# Runnable vs Callable
Runnable class will run the class in a given thread
- it will just run the class on a thread
- and **never return a value**
callable class will also run the given class in a given thread
- it will run the class on a thread
- and will return a value
- the value return will be wrapped up with a future data type. Which means data will be obtained somewhere in future.

The executive service will execute both runnable and callable interfaced class.
Source Code : [[LLD/SCALAR_LLD/src/main/java/in/sanjeetdutt/M001_Concurency/P005_Callable/Client.java|Client]]
```java
// Example of callable class

//Callable<Double> means have return valuse as Double
public class AsyncClass implements Callable<Double> { 
  
    public AsyncClass() {  
        System.out.println("ASYNC CLASS CREATED");  
    }  

	// call is implemented by Callable
    @Override  
    public Double call() throws Exception {  
        System.out.println("RUNNING ASYNC CLASS");  
        Thread.sleep(5000);  
        Double number = Math.random();  
        System.out.println("SYSTEM GENERATED RANDOM NUMBER = " + number);  
        return number;  
    }  
}

public class Client {  
    public static void main(String[] args) throws ExecutionException, InterruptedException {  
        System.out.println("APPLICATION STARTING....");  
  
        AsyncClass asyncClass = new AsyncClass();  
  
        ExecutorService executorService = Executors.newFixedThreadPool(1);  
  
        Future<Double> futureRandomNumber = executorService.submit(asyncClass);  
        executorService.shutdown();  
        
        // Pointer will wait till we are getting the result.
        // Here it will be 5000ms.
        Double randomNumber = futureRandomNumber.get();  
        System.out.println("FUTURE RANDOM NUMBER IS : " + randomNumber);  
  
        System.out.println("APPLICATION STOPPED....");  
    }  
}

```

# Synchronisation
- issues we are trying to resolve in synchronisation
	- let's suppose a variable has been declared which is used by two concurrent processes.
	- due to concurrency different thread will pick different value of variable 

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
- Race of completing the task.
	- Thread will try to complete the process as soon as possible.
	- Task A does not care whether Task B is completed or not and vice versa.
 - Two or more threads can enter the  critical sections at the same time
	  ## Pre-empt
	- Related to context switching
	- let's suppose we are on a function A and executed some of the line, which has i++, in between system decide to do context switch and start running function B which has i--. And again in between it, try to switch the context back to A. In this situation, the value of I is wrong.
	- this is an issue called, Pre-empt.
	- where context has been switching in between of the critical section, leading to wrong data in the calculation.
	- if we try to fix this, we will lose concurrency.
	 - If we introduce something which restrict the thread to enter a critical section will fix the issue of synchronisation
## Solution to fix synchronisation
- To fix synchronisation, we can have a concept of MuteX
- MuteX = deviated from two terms
	- Mut = mutual
	- eX = execution
- Means letting only one thread to operate variable at a time in a given critical section.
- Suppose one task is accessing the critical section, 
	- It can lock the variable until the whole process is completed. 
	- Once the process is completed, it can unlock the critical section and that section is ready to use by another task.
- Meanwhile, when the variable is locked by other process/ task, other task need to wait till the section is unlocked
- By doing this way, concurrency will be affected, but still, we have some advantages of concurrency and at the same time, we can remove the issue of synchronisation

Source code : [[LLD/SCALAR_LLD/build/classes/java/main/in/sanjeetdutt/M001_Concurency/P006_MutEx/Client.class|Client]]
```java
public class Value {  
    public Integer value = 0;  
}

public class Adder implements Runnable{  
    Value value;  
    Lock lock;  
    int valInc;  
  
    public Adder(Value value, Lock lock, int valInc) {  
        this.value = value;  
        this.lock = lock;  
        this.valInc = valInc;  
    }  
  
    @Override  
    public void run() {  
        lock.lock();  
        System.out.println("+++ADDING START");  
        this.value.value += valInc;  
        System.out.println("+++ADDING COMPLETE+++");  
        lock.unlock();  
    }  
}

public class Subtract implements Runnable{  
    Value value;  
    Lock lock;  
    int valDec;  
  
    public Subtract(Value value, Lock lock, int valDec) {  
        this.value = value;  
        this.lock = lock;  
        this.valDec = valDec;  
    }  
  
    @Override  
    public void run() {  
        lock.lock();  
        System.out.println("----------SUBTRACTING START");  
        this.value.value -= valDec;  
        System.out.println("----------SUBTRACTING COMPLETED----------");  
        lock.unlock();  
    }  
}

public class Client {  
  
    public static void main(String[] args) {  
        ExecutorService executorService = Executors.newFixedThreadPool(2);  
        Value value = new Value();  
        Lock lock = new ReentrantLock(); 
        // Serving the same lock for all Synchronus code  
  
        for(int i = 0; i < 100; i++){  
            Adder adder = new Adder(value, lock, i);  
            Subtract subtract = new Subtract(value, lock, i);  
            executorService.submit(adder);  
            executorService.submit(subtract);  
        }  
  
        executorService.shutdown();  
    }  
}

```

#  Synchronised Function
## Synchronised variable
Every object in Java comes with inbuilt locking mechanism that we can use to lock during concurrency
Can be applied to but instance and static method
```java
public class Client {  
    public static void main(String[] args) {  
        //EXECUTOR SERVICES  
    }  
  
    void functionA (Integer i){  
        synchronized (i){  
            System.out.println("VAL OF I IS : " + i);  
        }  
    }  
  
    void functionB (Integer i, Integer j){  
        synchronized (i){  
            synchronized (j){  
                System.out.println("VAL OF I,J IS : " + i + ","+j);  
            }  
        }  
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
and **cannot be applied on the primitive data type.**

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

# Semaphores
##  Producer and consumer problem
problem statement
- let's suppose we have a buffer of N fields, in which producers can add a value and consumer can remove a value. we have C consumers and P producers.
- the number of value cannot exceed N and neither smaller than 0
![[Pasted image 20240314152045.png]]

Using an concurrency process we can add a remover product at the same time.
Issue while using concurrency
- overflow issue
	- let's suppose there are 8 buffer Fields out of which 4 fill
	- the system trigger 5 producer threads which will add a  value at the same time
	- while entering a field all the 5 reducer thread will see 4 fields are filled out of 8 
	- all the threads will contribute into the buffer field
	- at the end, buffer size will become nine
- similar issue can be found in consumer process as well due to which removal of item can go to negative number which will throw an error
- to fix the issue, we can use any of the method that we learnt so far
- But it issue with them is we will lost concurrency
	- at a given time only one thread bill interact with buffer memory where there is a chance of more than one at a time
	- to resolve this issue, we have concept of Semaphores
## Semaphores
Semaphores = ***MuteX + Counting for thread*** = More than one thread in the critical section
	In the problem of producer and consumer, we can identify the buffer having 8 field and attain total eight threats (producers + consumers) at a time
Semaphores do the following activities
- maintain the count of thread inside a critical section
- indicating other thread which are about to go into a critical section
by doing in this way, the problem of overflow issue and negative indexing can be fixed.
*NEED TO CONTINUE THE CLASS*


