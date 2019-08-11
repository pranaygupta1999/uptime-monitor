var config = {};
config.environments = { 
    'development' : {
        port:3000,
        name:'development'
    },
    'production':{
        port:5000,
        name:"production"
    }
};
config.currentEnvironment = process.env.NODE_ENV ? config.environments[process.env.NODE_ENV] : config.environments.development;
module.exports = config;

