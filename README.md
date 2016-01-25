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

 