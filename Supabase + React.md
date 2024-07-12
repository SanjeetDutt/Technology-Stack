
# Signup Form
# Login Form

# Reset Password
- On the home page ask user to reset password
- Ask user 3 things
	- User email
	- old password
	- new password
		- New password
		- confirm the password
			- strength validation ABcd12!@
	- Submit it
		- validate the inputs on email and old password
		- if ok => then reset it to new password

# Forget Password
- ask user their email
- if ok => bcrypt(<id>) =>  console.log(URL = window.location.origin + reset + / + hashkey)
	- example = locahost:3000/reset/asdfhgk99475
	- asking user new password
	- if it is ok => reset the old password to new password