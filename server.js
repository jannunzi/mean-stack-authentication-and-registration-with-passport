var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: [String]
});

var UserModel = mongoose.model('UserModel', UserSchema);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

//var users =
//[
//    {username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonderland', roles: ['admin', 'student', 'instructor']},
//    {username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', roles: ['student']},
//    {username: 'charlie', password: 'charlie', firstName: 'Charlie', lastName: 'Brown', roles: ['instructor']}
//];

passport.use(new LocalStrategy(
function(username, password, done)
{
//    for(var u in users)
//    {
//        if(username == users[u].username && password == users[u].password)
//        {
//            return done(null, users[u]);
//        }
//    }
    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function(req, res){
    var user = req.user;
    console.log(user);
    res.json(user);
});

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});     

app.post('/register', function(req, res)
{
    var newUser = req.body;
    newUser.roles = ['student'];
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) { return next(err); }
        if(user)
        {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user)
        {
            req.login(user, function(err)
            {
                if(err) { return next(err); }
                res.json(user);
            });
        });
    });
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get("/rest/user", auth, function(req, res)
{
    UserModel.find(function(err, users)
    {
        res.json(users);
    });
});

app.delete("/rest/user/:id", auth, function(req, res){
    UserModel.findById(req.params.id, function(err, user){
        user.remove(function(err, count){
            UserModel.find(function(err, users){
                res.json(users);
            });
        });
    });
});

app.put("/rest/user/:id", auth, function(req, res){
    UserModel.findById(req.params.id, function(err, user){
        user.update(req.body, function(err, count){
            UserModel.find(function(err, users){
                res.json(users);
            });
        });
    });
});

app.post("/rest/user", auth, function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user) {
        if(user == null)
        {
            user = new UserModel(req.body);
            user.save(function(err, user){
                UserModel.find(function(err, users){
                    res.json(users);
                });
            });
        }
        else
        {
            UserModel.find(function(err, users){
                res.json(users);
            });
        }
    });
});

app.listen(3000);