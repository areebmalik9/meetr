var express = require('express')
 
var app = express()

var bodyParser = require('body-parser')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var login = [{username:"user", password:"password"}]

app.post('/signup', function(req, res) {
	console.log("Signing up")
	var exists = false
	for (var i in login) {
		if (login[i].username.toLowerCase() == req.body.username.toLowerCase()) {
			exists = true
			console.log("User exists")
			res.end("User exists")
			break
		}
	}
	if (!exists) {
		login.push({username:req.body.username, password:req.body.password})
		for (var i in login) {
			if (req.body.username == login[i].username && req.body.password == login[i].password) {
				authenticated = true
				break
			}
		}
		console.log("Created User")
		res.end("success")
	}
})

app.post('/login', function(req, res) {
	console.log("Authenticating login")
	var authenticated = false
	for (var i in login) {
		if (req.body.username == login[i].username && req.body.password == login[i].password) {
			authenticated = true
			break
		}
	}
	console.log(authenticated)
	res.json({authentication: authenticated})
})
 
app.listen(3000)
console.log("Application running...")
