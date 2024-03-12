not mandatory
[URL LOCATION TO CHOCOLATY](https://chocolatey.org/)

to install [DOCS](https://chocolatey.org/install#individual)
	open power shell as admin
	Execute > Get-ExecutionPolicy
		if return Restricted then run > Set-ExecutionPolicy AllSigned
	Execute > Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
if error happen during the installation, try to turn off the anti-virus

to install app via chocolaty
	open [this url](https://community.chocolatey.org/packages)
	search for app you want to install
	copy the command 
	run in Power shell with admin rights
	