1. Application to manage employee in an organization
2. We can create multiple organization in the application
	1. Each organization should be independent to the another organization
		1. Better to store the data into different schemas
	2. There should be a set of user which do not belong to a organization can create, update and delete the organization
		1. We will call it as SUPER_ADMIN
		2. SUPER_ADMIN can be created by system administrator
		3. SUPER_ADMIN should have capability to manage the organization 
			1. They can log into the organization
			2. Can Impersonate as an employee or as admin to view and edit things
		4. Their should be a proper login of their activities.
	3. There should a set of user which owns the organization know as ADMIN
		1. ADMIN can be of any number, no restriction
		2. All admin will share the same role
		3. They cannot see other organization data.
		4. They can manage all the functionality in the organization