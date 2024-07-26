- Basic requirement
	- create a repo with Viral
	- branching strategy
		- main
		- develop
		- feature / .....
			- create a branch from develop branch
			- your need to do dev on feature branch
			- can merge the changes to develp branch
			- raise a PR from feature to main branch
	- technology
		- FE
			- React
			- sass / scss / css
				- proper folder structure
				- variabalization
				- BEM structure
				- mobile first approach
			- typesccript
			- redux and redux toolkit
			- all business logic here
		- BE
			- supabase
			- just for data storage
		- deployment
			- cloudflare / versel / netlify
				- develop branch
	- requirements
		- application will have many user
			- user
				- name
				- email
				- mobile
		- user can create a group call hime as admin
		- admin can add other user in group
			- from email or phone number
		- no need to add verification
		- once group is created
			- any member can add expence
				- application should ask how much and how owes you
				- add particulars - string
			- once expence added, show me final how much other owes me or owes how much to whome

group 5
Y -> s = 2000
S -> y = 1000 X

Y->S = 1000

A -> B = 100
A -> C = 100
B-> C = 200

A->C=300
B->A=100

data designing
table > User
- name, email, phone, id(PK)

table > group
- group id, name

table > group_user
- group id , user id

table > txn
- user give, user owe, group id, amount, completed (T/F)

1,2,1,40,T

.
.
.
.
.
.
.
.

2,1,1,1000,T