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
```
			class PCB{
				pid
				List<Variable>
				register <= address of register where calculation happen
				priority <= priority of programe over other programe
				memoryDetails
				programCounter <= current line of execution
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
```
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
