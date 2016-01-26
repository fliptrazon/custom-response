# custom-response
Structured response for Node.js application

## Motivation
Javascript is a loosely typed language, which is great, but sometimes you need a structure. 
While transferring your data between controller layer and service(business) layer, 
following similar response format can greatly help in code manageability and readability.

## How to use
When you require `custom-response` module, it returns a constructor that is used to create
 a structured response.
 
```
var CustomResponse = require('custom-response');
```

Once you have constructor, you can create a new instance/object from it and set the values

```
var CustomResponse = require('custom-response');  
var cRes = new CustomResponse();  
cRes.setResult({})  
```

## Structure
An instance of `CustomResponse` have 2 top level keys and certain access methods, which are used to access to modify
 the values stored in `cRes`
 
```
// structure of an instance of `CustomResponse`
// {
//    httpStatus : <HTTP status code>;
//    body : {
//        exception: true,
//        result: {},
//        msgs: []
//    }
// }
```
#### Properties:  

1. **httpStatus** Contains the http status code for the request. Default value is 500. 
  For example, if it was fulfilled correctly the value should be 200. 
  If there was a server side error, it could be 500 and so on. This field is used to set
  the status code for `Response`
2. **body** The actual result and meta information about the response.
  1. **exception** Should be **boolean**. It represents the status
    of the response. Its value should be FALSE, in-case `httpStatus` is 200. 
    There are cases where, `httpStatus` can be 200 but still `exception` can be TRUE. 
    For example, user tried to modify some data, but did not specify a mandatory field,
    in this case, `httpStatus` can be 200, but `exception` will TRUE, since the operation
    was not successful.
  2. **result** The actual result for the request. It can be of any type,
    an array, an object, an array of objects, Number, string etc.
  3. **msgs** Additional messages in the response. For example, while updating profile, user leaves contact detail 
    empty but its required, in this case, we can add a message to `msgs`. 
    
#### Methods:
    
* **setStatus(status)** - set http status code
* **getStatus()** - get http status code from object      
* **addMessage(msg)** - add message to existing array     
* **setMessages(messages)** - override the `msgs` property and set `messages` as its value       
* **getMessages()** - return value of `msgs` property      
* **setResult(data)** - set `data` as value for `result` property      
* **getBody()** - return the value of `body` property
* **setException(status)** - set exception flag for response      
* **getException()** - return the value of exception flag for response 
     
## Example

Consider the case of user signup/registering to your application. For this 
example lets consider, that the required fields are:  
* Name
* Email
* Password     

Following cases will be covered:
1. User did not provide email 
2. User provided an email, which already registered in your application
3. The password is too weak
 
#### Route handling

```
var signupController = require('<path to signupController.js>')
app.get("/signup",signupController.form)
app.post("/signup",signupController.create)
``` 

#### Signup form( Jade template )
```
html
  head
    title Sample for custom-response
  body
    form(method="post")
      div
        label Your name
        input(type="text",name="name",value=result.name)
      div
        label Email
        input(type="email",name="email",value=result.email)
      div
        label Password
        input(type="password",name="password",value=result.password) 
      div
        input(type="submit",value="Submit")         
```

#### Controller

```
var services = require("<path to signupServices.js>")

exports.form = function(req,res){
  function callback(data){
    res.status(data.getStatus()).render('signupForm',data.getBody())
  }
  
  services.form(req,callback)
}

exports.create = function(req,res){
  function callback(data){
    
    // if there was an exception, render the signup form again  
    if ( data.getException() ){
      res.status(data.getStatus()).render('signupForm',data.getBody())    
    } else {
      
      // write code to setup session or this can be done in service method also
      // redirect user to home page
      res.redirect('/')
    }
  }
  
  services.create(req,callback)
}
```

#### Service (file with business logic)

```
var CustomResponse = require('custom-response')

exports.form = function(req,callback){
  var cRes = new CustomResponse();
  
  cRes.setException(false);
  cRes.setStatus(200);
  
  callback(cRes)
}

exports.create = function(req,callback){
  var cRes = new CustomResponse();
  
  // since its a post request data will be accessed from `req.body`
  var body = req.body,
      name = body.name,
      email = body.email,
      password = body.password;
  
  // exception is set to false initially
  // if any validation check fails, it'll again be set true
  cRes.setException(false);

  // name not specified or kept empty 
  if ( !name ) {
    cRes.addMessage('Name is required')
    cRes.setException(true);
  }

  // email not specified or kept empty 
  if ( !email ) {
    cRes.addMessage('Email is required')
    cRes.setException(true);
  }
  
  // password not specified or too weak
  if ( _isWeak(password) ) {
    cRes.addMessage('Your password is weak. Try a longer password, with special symbols')
    cRes.setException(true);
  }
  
  if (cRes.getException() === true) {
  
    // set `req.body` as result, this will be used to repopulate the signup form
    cRes.setResult(body)    
  } else {
    // create user
  } 
  
  // by default status is 500, hence you should set its value before you pass it to callback
  cRes.setStatus(200);
  
  callback(cRes)
}

function _isWeak(password){
  
  // code to check password strength
}
```