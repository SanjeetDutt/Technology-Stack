- B = Block
	- component identifier = login layout
	- class name = login-layout
- E = Element
	- Element List
		- Form element
			- class name = __login-form
			- complete class name = login-layout__login-form
		- Hero element
			- class name = hero-element
			- complete class name = login-layout__hero-element
- M = Modifier
	- is to make changes to the parent styles

- layout (login-layout)
	- props = src
	- children
		- signup form(__login-form)
			- image comp(__image) (login-layout__login-form__image)
			- h1
			- form
				- label txt box comp
					- label
					- txt box
				- button

```scss
.login-layout{
	min-height: 100vh;
	d: flex;
	....
	
	&__login-form{
		width: 40%

		&--sign-in-page{
			bg-color:red;
		}

		&--login-page{
			bg-color: blue;
		}
	}

	&__hero-element{
		width: 60%;
	}
}

.image{
	&__etc{
	}
}

.btn{
	width:200px;
	height:100px;
	bg-color: black;

	&--ouline{
		bg-color: none;
		border: 1px solid black;
	}

	&--primary{
		....
	}
}
```

```html
<div class="login-layout__login-form login-layout__login-form--sign-in-page">
	<img class="image__etc" />
</div>

<btn class="btn btn--outline">...</btn>
```


```scss
.login-page{
	&__hero{..}
	&__form{
	
		&-image{
		}
		
		&-label{}
		&-input{}
		&-forget-password{}
		&-sign-in-btn{}
	}
}
```


```js
const setCookie = (name, data, timout=0.0416) => {
	
}

const signIn = async(username, password)=>{
	//api call
	if(!res || !res.data || !res.data.session){
		throw new Error(res.error?.message || "Default message")
	}
}

const handelSIgnIn = asycn (e)=>{
	e.preventDefault()
	try{
		await signIn(username, password)
		setCookie("token", res.data.session.access_token)
		navigate(PAGE_NAME.homepage)
		
	} catch (e){
		console.error("Got an error while signin")
	}
}
```