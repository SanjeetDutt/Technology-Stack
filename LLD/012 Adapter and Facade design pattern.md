
# Adapter 
- Intermediator layer, which convert one form of data into another
- this type of design pattern will be used in integrating third-party API

![[Pasted image 20240423214606.png]]


```java

// this is third-party API provided by yes Bank
class YesBankApi(){
	Float getBalance(){}
	void transferMoney(){}
}

// this is third-party API provided by ICICI bank
class IciciBankApi(){
	Float checkBalance(){}
	void sendMoney(){}
}

```

 the above are two different API, which is doing similar activities activities, but the property name are different. to integrate both API, we can do following implementations
```java
interface Bank{
	Float checkBankBalance();
	void sendMoney();
}

class YesBank implements Bank{

	YesBankApi yesBankApi = new YesBankApi();
	
	Float checkBankBalance(){
		return yesBankApi.getBalance();
	}
	
	void sendMoney(){
		yesBankApi.transferMoney()
	}
}

class IciciBank implements Bank{

	IciciBankApi iciciBankApi = new IciciBankApi();
	
	Float checkBankBalance(){
		return iciciBankApi.checkBalance();
	}
	
	void sendMoney(){
		iciciBankApi.sendMoney()
	}
}

class Main{
	public static void main(){
		// we are loosely coupling.
		// whenever we want to change bank
		// we need to change in one place
		// in other place, everything will work fine
		Bank bank = new YesBank(); 
		Float balance = bank.checkBankBalance();
		bank.sendMoney();
	}
}
```

The above example, demonstrate the adapter design pattern where
- we have created an intermediator layer like YesBank and IciciBank class, which implements the bank interface, which is having the common properties which we are using across the whole application. And on other hand, this class consumes actual third-party API is which makes the application a loosely coupled application.
- this design pattern also to make the court look very clean.

# Facade
The basic definition of a means boundary or outside of the building.
Basically, according to this design pattern approach, be outsource all the complex, logic, two and another helper class, which makes the code look very much clean and easy to read

![[Pasted image 20240423214416.png]]

![[Pasted image 20240423214515.png]]

