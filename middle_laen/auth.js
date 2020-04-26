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

function checkUsername(username){
	return RegExp("[a-zA-Z0-9ëêéèà]+").test(username)
}
function checkPassword(password){
	return (password.length != 0)
}
function checkEmail(email){
	return RegExp("[a-zA-Z0-9ëêéèà+.]+@{1}[a-zA-Z]+\.[a-zA-Z]+").test(email)
}
function checkGroup(group){
	return (!isNaN(group) || checkNumber(group))
}
exports.api= function(req,res,next){
	const crypto = require("crypto")
	let admin = req.session.admin 
    const ADMIN_GROUP = 1
    const NORMAL_USER_GROUP = 2
    let fields = {
		"id_user"   :"INTEGER PRIMARY KEY AUTOINCREMENT",
		"email_user":"TEXT",
        "name_user" :"TEXT NOT NULL UNIQUE",
        "salt_user" :"TEXT NOT NULL",
        "hash_user" :"TEXT NOT NULL",
        "id_group"  :"INTEGER NOT NULL"
    }
    const table = require("../utils/table")
    let db = new table.table("./data/db/users.db", "users", fields, () => {
		
		if (req.params.action == "createUser" && (req.method == "POST")){
			if (req.body.username === undefined || req.body.password === undefined){
				res.json({response:"failure", reason:"provide username and password"})
				return;
			}
			db.getCount((err, results) => {
				if (results[0].count == 0){
					admin = true
				}
				let username = req.body.username;
				let password = req.body.password;
				let email    = req.body.email;
				if (admin) 
				{
					let group    = req.body.group;
					if (checkUsername(username) && checkPassword(password)  && checkGroup(group))
					{
						let salt = Math.random().toString(36).substring(2)
						let salted = password+salt
						let hash = crypto.createHash('sha256').update(salted, 'utf8').digest("hex")
						newUser = {
							"name_user" :username,
							"salt_user" :salt,
							"hash_user" :hash,
							"id_group"  :group
						}
						if (email !== undefined && checkEmail(email)){
							newUser["email_user"] = email
						}
						db.post(newUser,(err) => {
							if (err){
							res.json({response: "error", err})
							}
							else{
								//res.send("<html><body>user created</body></html>")
								res.json({response: "success"})
							}
						})
					}
				}
				else 
				{
					let group    = NORMAL_USER_GROUP;
					if (checkUsername(username) && checkPassword(password)  && checkGroup(group))
					{
						let salt = Math.random().toString(36).substring(2)
						let salted = password+salt
						let hash = crypto.createHash('sha256').update(salted, 'utf8').digest("hex")
						newUser = {
							"name_user" :username,
							"salt_user" :salt,
							"hash_user" :hash,
							"id_group"  :group
						}
						if (email !== undefined && checkEmail(email)){
							newUser["email_user"] = email
						}
						db.post(newUser,(err) => {
							if (err){
							res.json({response: "error", err})
							}
							else{
								//res.send("<html><body>user created</body></html>")
								res.json({response: "success"})
							}
						})
					}
				}
			})
			
		}
		if (req.params.action == "login"){
			console.log("logging attempt")
			db.getByID(["name_user", "salt_user", "hash_user", "id_group", "email_user"], (err, data) =>{
				if (err){
					res.json(err)
					console.log("error")
				}
				else{
					let salt    = data["salt_user"]
					let hash_db = data["hash_user"]
					let password = req.query.password
					let salted = password+salt
					let hash2 = crypto.createHash('sha256').update(salted, 'utf8').digest("hex")
					if (hash2 == hash_db){
						req.session.username = data["name_user"]
						req.session.group = data["id_group"]
						if (data["id_group"] == ADMIN_GROUP){
							req.session.admin = true
						}
						req.session.public = {
							username : data["name_user"],
							group : data["id_group"],
							email : data["email_user"]
						}
						res.json({response:"successfull connection"})
					}
				}
			}, ["name_user", req.query.username])
		}
});
}