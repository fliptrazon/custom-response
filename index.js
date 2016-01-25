var _defaultStatus = 500;

var Response = function () {
    this.httpStatus = _defaultStatus;
    this.body = {
        exception: true,
        result: {},
        msgs: []
    }

}

var statusCodes = {
    OK : 200,
    BAD_REQUEST : 400,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    SERVER_EXCEPTION : 500,
    BAD_GATEWAY : 502,
    SERVICE_UNAVAILABLE : 503
}

Object.freeze(statusCodes);


Response.prototype.setStatus = function(status){
    this.httpStatus = status
}

Response.prototype.getStatus = function(){
    return this.httpStatus
}

Response.prototype.addMessage = function(msg){
    this.body.msgs.push(msg)
}

/**
 * To override existing array object with custom object/new array
 * @param msg
 */
Response.prototype.setMessages = function(msg){
    this.body.msgs= msg
}

Response.prototype.mergeMessages = function(msg){
    this.body.msgs= this.body.msgs.concat(msg)
}

Response.prototype.getMessages = function(msg){
    return this.body.msgs
}

Response.prototype.setResult = function(result){
    this.body.result = result;
}

Response.prototype.getBody = function(){
    return this.body
}

Response.prototype.setException = function(flag){
    this.body.exception = flag;
}

Response.prototype.getException = function(){
    return this.body.exception
}

Response.STATUS_CODES = statusCodes;

module.exports = Response