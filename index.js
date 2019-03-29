/**
 * @author Pranay Gupta
 * @version 1.0
*/

//so far so good.

//importing things
const http = require('http');
const config = require('./config');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//Creating the server
const server = http.createServer((req,res)=>{
    var parsed_url = url.parse(req.url,true);
    var trimmed_url = parsed_url.pathname.replace(/^\/+|\/+$/g,'');
    var query = parsed_url.query;
    var method = req.method.toUpperCase();
    var decoder = new StringDecoder('utf-8');
    var headers = req.headers;
    var buffer = "";
    
    var handler = router[trimmed_url] ? router[trimmed_url] : notFound;
    req.on('data',(data)=>{buffer+= decoder.write(data)});
    req.on('end',()=>{
        buffer+=decoder.end();
        console.log(trimmed_url);
        var data = {
            path: trimmed_url,
            method: method,
            headers: headers,
            query: query,
            payload: buffer
        };
        handler(data, (statusCode, payload)=>{
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            res.setHeader('content-type', 'application/json');
            res.writeHead(statusCode);
            console.log(payload);
            payload = typeof(payload) == 'object' ? payload : {};
            payload = JSON.stringify(payload);
            res.end(payload);
        });
        
        

    });
    
});

//Routes
var router = {
    home : homeRoute
};
function notFound(data, callback) {
    callback(404,{msg:"Not found"});
}
function homeRoute(data, callback) {
    response = {msg: "hello world"}; 
    setTimeout( ()=>{callback(200,response)},2000);
}

//listening to port
server.listen(config.currentEnvironment.port,()=>{
    console.log(config);
    console.log("server running on port "+ config.currentEnvironment.port);
});