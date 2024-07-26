Token :  
need to call with scope 
	read:current.user  
	urn:wbd-user-experience-api  
  
GET: [https://dev.us1.api.pacificlife.com/wbd/user/v1/currentUser](https://dev.us1.api.pacificlife.com/wbd/user/v1/currentUser)  
  it will return all user info from Okta which will include if the user has already verified DOB or not..  
sample payload:  
```JSON
{
    "created_at": "2024-07-08T16:13:02.928Z",
    "email": "murali.gogineni+dev0405@pacificlife.com",
    "email_verified": true,
    "family_name": "Willam",
    "given_name": "Denver",
    "identities": [
        {
            "connection": "email",
            "provider": "email",
            "user_id": "668c100e6dd4814d95225a31",
            "isSocial": false
        }
    ],
    "name": "Denver Willam",
    "nickname": "murali.gogineni+dev0405",
    "picture": "https://s.gravatar.com/avatar/aeb3ebbbd16e71efce68f61482763554?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdw.png",
    "updated_at": "2024-07-18T14:40:40.594Z",
    "user_id": "email|668c100e6dd4814d95225a31",
    "user_metadata": {
        "eoi_applicant_type": "Spouse",
        "eoi_applicant_name": "Tokeyo Colbert"
    },
    "multifactor": [
        "guardian"
    ],
    "multifactor_last_modified": "2024-07-08T16:18:49.919Z",
    "app_metadata": {
        "eoi_session_id": "eyJhbGciOiAiSFMyNTYiLCJ0eXAiOiAiSldUIn0.eyJVTWVFbXBsb3llZUVucXVpcnkiOiAiZWU2MDU5MTgtMDRjOC00YzJiLWEzNjMtOWExNzAxZTAyZTI3IiwiVU1lU3BvdXNlRW5xdWlyeSI6ICJmY2U0ZTgwMC1hMmNkLTQ3NTMtOGVlOS03ZTQ1M2RhMzVhZGYiLCJlb2lfYXBwbGljYW50X2luZm8iOiAiWi9hSndTQlZQd1hQc1pXL2R1SmR6VkVxaGluZ1dNVnhiZmJES0ZUMUo3UTJYTEVvZU5mNy9TL1RKL3JqdDJqV24rS1Q2VGd6MS95YTAvb05VR012c3d2M05BNHlWVHUyay9EZHZwSnh4bi84RFVJQUhnNXdVUmlPdGVIa3ErdmVWZm5XWGNvUHErTUxWSjBCU1lJR2w5MGJya2lkeno3b0I0Y1RDNGltVTRvemFZOWxoK3F4dGNlTC9OZ0hWb0MwOCtTVDhoV3QvYzk5Y1hHcWkwYm5QL1RBd1pPSk0wQmRRNk82Uk4zOHJIQnJTRGY4WDNjNFpTYmRFeEhOd2NBdCJ9.F02cqFLkKfZ93_EOCHzt4-Ny-jJaL5c2P5IWv314pag",
        "eoi_has_spouse": true,
        "lobs": [
            "wbd"
        ],
        "user_types": [
            "wbd_eoi_applicant"
        ],
        "e_consent": {
            "wbd-spa-eoi-app": [
                {
                    "agreementId": "400c63b6-4462-47a7-a8a1-2d99d3f16d81",
                    "agreedOn": "2024-07-08T16:24:05.6831208Z",
                    "version": "4.0",
                    "eoi_applicant_type": "Spouse"
                }
            ]
        },
        "eoi_spouse_eConsent": "agreed"
    },
    "wbd_data": {
        "identityVerification": {
            "wbd-spa-eoi-app": [
                {
                    "identityRequirements": [
                        "DateOfBirth"
                    ],
                    "verifiedOn": "2024-06-18T13:30:49.7721909Z"
                }
            ]
        }
    },
    "last_ip": "136.226.100.101",
    "last_login": "2024-07-18T14:40:40.594Z",
    "logins_count": 6
}
```
  
POST: [https://dev.us1.api.pacificlife.com/wbd/user/v1/currentUser/verify](https://dev.us1.api.pacificlife.com/wbd/user/v1/currentUser/verify)  
payload is generic.. but it will get validated against config endpoint that you guys host in AWS.  
  
sample response:  
```JSON
{  
	"app": "wbd-spa-eoi-app",  
	"verificationCompleted": true,  
	"retryAttempts": 1,  
	"userAccountLocked": false,  
	"lockExpirationTime": "2023-06-20T05:45:52.558Z"  
}  
```

  
```JSON
"wbd_data": {
	"identityVerification": {
		"wbd-spa-eoi-app": [
			{
				"identityRequirements": ["DateOfBirth"],
				"verifiedOn": "2024-06-18T13:30:49.7721909Z"
			}
		]
	}
}
```


from the first call will tell you if the user already verified or not..



3 pages
1. login
	1. okta -> econcent
2. econcent page
	1. 
3. error page


flow of econcent
1. initial load
	1. get user token
		1. type of application / user role 
		2. is user dob verified
		3. is user last 4 ssn verified
		4. is user blocked
		5. is econcent
		6. is MFA
	3. get api call
		1. long JS object
```js

const response = {
	applications :{
		"EOI":{
			process:[
				{
					validationRule:["dob","ssn"],
					page:"/validation"
				},
				[
 is user blocked					page:"/econcent"
				]
			],
			ridirectURL:"...."
		},
		"BROKER":{},...
	}
}
```

POST API => 
	is false
	is true =>
		get new token

2.  is user blocked === true
		1. show blocked user page





---

TS, Styled component


- copy of UI component from old to new
- implementation of old e-consent
- implementation of new DOB


to test on dev env



[Benefits Hub | WBD](http://localhost:3000/econsent?code=BoVHafpjvdLg_FYnr-cviLHxi7qu45HZ3RNGt8mo2Grk1&state=bzduUlVxZ1hCMnEyQUs3dTluN201M01Xa1hST3NFdC1SVU9IWlYwVks3aQ%3D%3D)



http://localhost:3000/econsent?session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjE4NDQyODEsImlzcyI6IndiZC1kZXYtcGFjaWZpY2xpZmUudXMuYXV0aDAuY29tIiwic3ViIjoiZW1haWx8NjY3ZWJhOGU3NTgwY2M2YjBiNDVlZDExIiwiZXhwIjoxNzIxODQ1MTgxLCJpcCI6IjE3MC44NS41NS4zMyIsImVtYWlsIjoic2FuamVldC5kdXR0K2RldGUwNUBwYWNpZmljbGlmZS5jb20iLCJ1c2VyX3R5cGUiOiJ3YmRfZW9pX2FwcGxpY2FudCIsIndiZF9hcHBfbmFtZSI6IndiZC1zcGEtZW9pLWFwcCIsIndiZF9uYW1lIjoiSmlsbCBKYWNrc29uIiwid2JkX2F1ZGllbmNlIjoidXJuOndiZC1lc2lnbmF0dXJlLWV2ZW50cy1leHBlcmllbmNlLWFwaSIsIndiZF9zY29wZSI6ImFncmVlbWVudC5lY29uc2VudCIsInN0YXRlIjoiUWt4UFYwRkZWbFYwUm1oVk9WcEdTVkZ1WmxCTlVXeE5iemRSWTJwbWZsQnVTbmRSZVRSMmEwcFhVdz09Iiwid2JkX2VvaV9hcHBsaWNhbnRfdHlwZSI6IlNlbGYiLCJ3YmRfZW9pX3Nlc3Npb25faWQiOiJleUpoYkdjaU9pQWlTRk15TlRZaUxDSjBlWEFpT2lBaVNsZFVJbjAuZXlKVlRXVkZiWEJzYjNsbFpVVnVjWFZwY25raU9pQWlPVEJpWkdRNE5XSXROR0U1TkMwME1UUmhMVGhsT1RNdE1UUmpOMkkwT1RkaE5HWmpJaXdpVlUxbFUzQnZkWE5sUlc1eGRXbHllU0k2SUNKaFpUWXlPR1ppTVMwMU1XUTBMVFJtWmpndFlUZGhaUzFrTlRsa1lXUm1NR0V3WTJNaUxDSmxiMmxmWVhCd2JHbGpZVzUwWDJsdVptOGlPaUFpV2k5aFNuZFRRbFpRZDFoUWMxcFhMMlIxU21SNlluWlVZMll6WVVKWU1Ua3lkRm95SzNSdFMwSXJNbkpCWTNoaFNHWnBZME5hV1hCWWVTOHhTamd2YVhObWNGSm9jaTlSVEc5SFptY3ZOR2c0WkZob2NEaFVTeXN5Ums1MVdFd3laVzVPTUd3MVJVMW5UamxNVnpJNE56TXlZVWQxY25kUUswNDJWRFJMVVhOdFVtc3ZOM2N5YjA1d2EzbDBVMnRCWlVsbVptUmFjMnNyUmpaa016UXlVM0l4V1VaSFF6azJaVlpVUkc1TFp6bEhXbUo1TjNOM1V6bHpOVVJ0YTFVek0yMVhaRmt4ZDJjclpsVXhkV3g2Wkd4UWJVdHlUbTVNTTBwU2RqaFljbVZSY2xoTU1rRmhiV3h2YkVSTU1tdEhlbk5tZFRoWFNFczFUaTlPTXpkbWFTSjkuR1dPdlVhVnBUdlBQcEsyQ19qZl9LeVNfRFQ4VkNZcWN6UkVQQThneU1vUSJ9.2xRImS0DWNEmYEjiVT53x42M5hU9zkByK2cPbzFVvM0&state=hKFo2SBmNlVOVEJ5b1BuMnNfLWtiRHpaTzVJMldQRFU1ZXRLUqFuqHJlZGlyZWN0o3RpZNkgc2p4Y3pMYWRLTFRDVElESEFVb3k0T3RPZjlVUnh6ZHajY2lk2SB4V3c0N1lFVXk2QzY0a1JacmZmb2NyQWJtSDdsSDI0Mg
















Earlier version

USER - APP OF APP (Benefit hub.)-> EOI

- Authenticate the user
- Sign the E consent

OKTA(EMAIL/OTP) -> DOB -> APP OF APP (BH)(E-CONSENT) -> OKTA(MFA) -> 
APP OF APP (BH)(E-CONSENT)  (TOKEN) -> EOI

NEW PROCESS

OKTA(EMAIL/OTP) -> (TOKEN1) DOB -> APP OF APP (BH)(E-CONSENT) -> OKTA(MFA) -> 
APP OF APP (BH)(E-CONSENT)  (TOKEN2) -> EOI








- NODE 14 -> 20
- 