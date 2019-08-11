/**
 * All the routes are set here
 */
const database = require('./data');

var router = {
    
};
router.notFound = function (data, callback) {
    callback(404, { msg: "Not found" });
};
router.homeRoute = function (data, callback) {
    response = { msg: "hello world" };
    setTimeout(() => { callback(200, response) }, 2000);
};
router.users = function (data,callback) {

    var valid_req = ['get','post','put', 'delete'];
    if (valid_req.indexOf(data.method.toLowerCase()) >=0){
        _users[data.method](data,callback);
    }
    else
        callback(400,'Not a valid request');
}
_users = {};
_users.GET = function(data,callback){
    console.log(data.query);
    if( data.query.phone){
        database.read('users',data.query.phone)
            .then((data)=>{
                callback(200,data);
            })
            .catch((err)=> callback(400,err));
    }
    else
        callback(400,"Phone no. not provided");
}
_users.POST = function(data,callback){
    if(data.query.name && data.query.pwd && data.query.phone){
        database.create('users',data.query.phone,data.query)
            .then(()=>callback(200,"Created successfully"))
            .catch((err)=>callback(400,err));

    }
    else
        callback(400,"Please provide details");
}
module.exports = router;