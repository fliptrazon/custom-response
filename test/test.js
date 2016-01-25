import test from 'ava';
import CustomResponse from '../index';


test('expose a constructor', t => {
    t.plan(1);
    t.is(typeof CustomResponse, 'function');
})

test('get http status', t => {
    const cRes = new CustomResponse()

    t.plan(1);
    t.is(cRes.getStatus() ,cRes.httpStatus)
});

test('set http status', t => {
    const cRes = new CustomResponse()
    cRes.setStatus(CustomResponse.STATUS_CODES.OK)

    t.plan(1);
    t.is(cRes.getStatus() ,CustomResponse.STATUS_CODES.OK)
});

test('get messages', t => {
    const cRes = new CustomResponse()

    t.plan(1);
    t.is(cRes.getMessages(),cRes.body.msgs)
});

test('add message', t => {
    const cRes = new CustomResponse()
    const length = cRes.getMessages().length
    cRes.addMessage('Sample input')

    t.plan(1);
    t.is(cRes.getMessages().length -1 ,length)
});

test('set messages', t => {
    const cRes = new CustomResponse()
    cRes.setMessages(['Sample input'])

    t.plan(1);
    t.is(cRes.getMessages().join(',') ,['Sample input'].join(','))
});

test('get body', t => {
    const cRes = new CustomResponse()

    t.plan(1);
    t.is(cRes.getBody(),cRes.body)
});

test('throws error if `body` is NULL and user try to set values', t => {
    const cRes = new CustomResponse()
    cRes.body = null

    t.plan(4);
    t.throws(function(){cRes.setResult({})})
    t.throws(function(){cRes.addMessage('Some message')})
    t.throws(function(){cRes.setMessages(['adding messsage'])})
    t.throws(function(){cRes.setException(false)})
});

test('set result', t => {
    const cRes = new CustomResponse()
    const result = {key1:"value1",key2:"value2"}

    cRes.setResult(result)

    t.plan(1);
    t.is(cRes.getBody().result ,result)
});




/*
test('bar', async t => {
    t.plan(2);

    const bar = Promise.resolve('bar').then(delay(200));

    t.is(await bar, 'bar',"Value matched");
    t.is(await bar, 'bar');

});


test.skip('will not run', t => {
    t.pass();
});*/
