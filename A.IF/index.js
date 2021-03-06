var express        = require("express");
var mongoose       = require("mongoose");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var flash          = require("connect-flash");
var session        = require("express-session");
var passport       = require("./config/passport");
var app = express();
var MONGO_DB = "mongodb://Admin:admin1001@ds135852.mlab.com:35852/aif";


// DB setting
mongoose.connect(MONGO_DB, { useNewUrlParser: true });
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({
  secret: 'IL',
  resave: true,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
})

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/qaposts", require("./routes/qaposts"));
app.use("/debate", require("./routes/debate"));
app.use("/information", require("./routes/information"));
app.use("/books", require("./routes/books"));
app.use("/library", require("./routes/library"));

// Port setting
app.listen(3000, function(){
  console.log("server on!");
});
