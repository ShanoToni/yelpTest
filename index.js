const express           = require("express");
const app               = express();
const bodyParser        = require("body-parser");
const mongoose          = require(`mongoose`);
const Campground        = require("./models/campgrounds");
const seedDB            = require("./seeds");
const Comment           = require("./models/comments");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const User              = require("./models/user");
const methodOverride    = require("method-override");
const connectFlash      = require("connect-flash");

//routes
const commentRoutes     = require("./routes/comments");
const campgroundRoutes  = require("./routes/campgrounds");
const indexRoutes       = require("./routes/index");

//Seed the DB
//seedDB();

mongoose.connect('mongodb+srv://shano:tFS-4FV-BbT-h9a@cluster0-andyp.mongodb.net/yelpCamp?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(connectFlash());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//PASSPORT
app.use(require("express-session")({
    secret: "Vadim Suka Asshole Neighbour",
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.get("*", (req,res)=>{
    res.redirect("/campgrounds");
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server is started!");
});