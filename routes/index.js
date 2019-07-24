const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


router.get("/", (req, res) =>{
    res.render("landing",);
})


//register
router.get("/register", (req,res)=>{
    res.render("register")
});

//register Create
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("back");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Created Account!");
           res.redirect("/campgrounds"); 
        });
    });
});

//login
router.get("/login", (req,res)=>{
    res.render("login");
});

//login POST
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect:"/login"
    }) , (req,res)=>{
        req.flash("success", "Logged In!");
});

//logout
router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
});



module.exports = router;