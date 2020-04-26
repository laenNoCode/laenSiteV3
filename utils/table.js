function checkNumber(suspicious){
    let test=true;
    if (suspicious.length != 0){
        for (let i = 0; i < suspicious.lenght; i++){
            if ("0".charCodeAt(0) > suspicious.charCodeAt(i) || "9".charCodeAt(0) < suspicious.charCodeAt(i))
                test = false
        }
        return test;
    }
    return false;
}

exports.table = class {
    constructor(fileName, tableName, schema, callback){
        this.fileName = fileName;
        this.tableName = tableName;
        this.schema = schema;
        const sqlite = require("sqlite3").verbose();
        let requestArray = []
        Object.keys(schema).forEach(element => {
            requestArray.push( element + " " + schema[element])
        });
        
        let db = new sqlite.Database(fileName, sqlite.OPEN_READWRITE|sqlite.OPEN_CREATE, (err)=>{
            console.log(err)
        })
        let creationRequest = "CREATE TABLE IF NOT EXISTS "+ tableName +"(" + requestArray.join(",") + ")"
        db.serialize(() => {
         db.run(creationRequest, [], (err) =>{
             console.log("initialized")
            db.close();
            callback(err);
         })
         console.log("initializing database... " + creationRequest)
         
        })
        
    }

    get(fieldNames, callback, lenght, offset){
        let request = "SELECT ";
        const sqlite = require("sqlite3").verbose();
        console.log(fieldNames)
        let keys = []
        Object.keys(this.schema).forEach((key) => {
            if (fieldNames.length == 0 || fieldNames.includes(key))
            {
                console.log(key)
                keys.push(key)
            }
        })
        request += keys.join(", ") +  " FROM " + this.tableName + " ";
        if (lenght !== undefined && (!isNaN(lenght) || checkNumber(lenght))){
            request += "LIMIT " + lenght;
            if (offset !== undefined && (!isNaN(offset) || checkNumber(offset))){
                request += " OFFSET " + offset;
            }
        }
        let db = new sqlite.Database(this.fileName, sqlite.OPEN_READ,console.log)
        console.log(request)
        db.all(request, [], callback)
        db.close()
    }
    post(fields, callback){
        const sqlite = require("sqlite3").verbose();
        let request = "INSERT INTO " + this.tableName + " (";
        let data = []
        let prep = []
        let fieldNames = []
        Object.keys(this.schema).forEach((key) => {
            if (Object.keys(fields).includes(key))
            {
                fieldNames.push("`" + key + "`")
                data.push(fields[key])
                prep.push("?")
            }
        })
        request += fieldNames.join(",") + ") VALUES (";
        request += prep.join(",") + ")"
        console.log({request,data})
        let db = new sqlite.Database(this.fileName, sqlite.OPEN_READWRITE,console.log)
       
        db.run(request, data, callback)
        db.close()
    }

    getCount(callback){
        const sqlite = require("sqlite3").verbose();
        let request = "SELECT COUNT(*) as count FROM " + this.tableName; 
        let db = new sqlite.Database(this.fileName, sqlite.OPEN_READ,console.log)
        console.log(request)
        db.all(request, [], callback)
        db.close()
    }
    getByID(fieldNames, callback, field){
        let request = "SELECT ";
        const sqlite = require("sqlite3").verbose();
        console.log(fieldNames)
        let keys = []
        Object.keys(this.schema).forEach((key) => {
            if (fieldNames.length == 0 || fieldNames.includes(key))
            {
                keys.push(key)
            }
        })
        if (!Object.keys(this.schema).includes(field[0]))
        {
            callback({result:"invalid key"})
            return;
        }
        
        request += keys.join(", ") +  " FROM " + this.tableName + " WHERE " + field[0] +"=?";
        
        let db = new sqlite.Database(this.fileName, sqlite.OPEN_READ,()=>{})
        db.each(request, [field[1]], callback)
        db.close()
    }
}
