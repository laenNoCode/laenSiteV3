exports.api= function(req,res,next){
    let admin = req.session.admin
    
    res.append("Content-type", "application/JSON")
    if (req.params.id=="blog"){
        if (req.method=="GET"){
            const fs = require('fs')
            truc = fs.readFile("./data/truc.json",(err,data)=>{
                if (!err)
                    res.json({response:"ok","data": JSON.parse(data)})
                else
                    res.JSON({response:"error"})
            })
            
        }
    }
    if (req.params.id=="blog2"){
        fields = {
            post_id:"INTEGER PRIMARY KEY AUTOINCREMENT",
            title:"varchar(100) NOT NULL",
            short:"TEXT",
            long: "TEXT"
    }
    const table = require("../utils/table")
    
        db = new table.table("./data/db/blog.db", "posts", fields, () => {
            console.log(req.method)
            if (req.method=="POST"){
                db.post(req.body,(err) => {
                    if (err){
                        res.json({response: "error", err})
                    }
                    else{
                        res.json({response: "success"})
                    }
                })
            }
            if (req.method=="GET"){
                db.get(Object.keys(req.body), (err, data) =>{console.log(err);res.json({response:"success",data})})
            }
        });
        
        
    }
    if (req.params.id == "myInfo"){
        if (req.session.public !== undefined)
        {    res.json({response: "success", public: req.session.public})}
        else{
            res.json({response: "failure", message:"you must be logged in to do that"})
        }
    }
}