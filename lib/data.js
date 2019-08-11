/**
 * @description handles the database
 */

//dependencies
const fs = require('fs')
const path = require('path')



data = {}

basedir = path.join(__dirname, "/../.data")

/**
 * used to create a data collection
 * @param collectionName Name of the collection
 * @param objectName Name of the object like primary key
 * @param data Data to be written
 * 
 */
data.create = function (collectionName, objectName, data) {

    data = typeof (data) == 'object' ? JSON.stringify(data) : data;
    return new Promise((resolve, reject) => {
        fs.open(basedir + '/' + collectionName + '/' + objectName + ".json", "wx", (err, file) => {
            if (!err)
                fs.write(file, data, err => {
                    if (!err) {
                        fs.close(file, err => {
                            if (!err)
                                resolve();
                            else
                                reject("Unable to close" + err);
                        })
                    }
                    else
                        reject("Unable to write to the file " + err);
                });
            else
                reject("Unable create the file " + err);

        });
    });
}

/**
 * Used for updating the data that already exist
 * @param collectionName name of the collecion
 * @param primaryKey The primary key of the object
 * @param data The data to be written
 * @returns Promise of the data updated
 */
data.update = function (collectionName, primaryKey, data) {
    data = typeof (data) == 'object' ? JSON.stringify(data) : data;
    return new Promise((resolve, reject) => {
        fs.writeFile(basedir + "/" + collectionName + "/" + primaryKey + ".json", data, err => {
            if (!err)
                resolve()
            else
                reject("Can't update " + err);
        });
    });
};

/**
 * Performs the Read operation from the 
 * database. The Read from CRUD
 * @param collectionName The name of the collection
 * @param primaryKey The primary key of the object to read from
 * @returns The promise of the data read
 */

data.read = function (collectionName, primaryKey) {
    return new Promise((resolve, reject) => {
        fs.readFile(basedir + '/' + collectionName + '/' + primaryKey + '.json','utf-8',(err, data) => {
            console.log(data);
            if (!err) resolve(data);
            else reject('Cant read from file ' + err);
        });
    });
};

/**
 * Performs the Delete operation from the 
 * database. The Delete from CRUD
 * @param collectionName The name of the collection
 * @param primaryKey The primary key of the object to delete
 * @returns The promise of the data deleted
 */

data.delete = function(collectionName, primaryKey){
    return new Promise((resolve,reject)=>{
        fs.unlink(basedir + '/' + collectionName + '/' + primaryKey + '.json',(err)=>{
            if (!err)
                resolve()
            else
                reject("Can't delete the file " + err);
        });
    });
};
//export the module
module.exports = data;