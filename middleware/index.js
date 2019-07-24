const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");
const connectFlash      = require("connect-flash");

let middlewareOBJ = {};

middlewareOBJ.checkCampOwner = (req,res,next) =>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                console.log(err);
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Access Denined!");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to Log In to do that!");
        res.redirect("back");
    }
}

middlewareOBJ.checkCommentOnwer = (req,res,next) =>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                console.log(err);
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Access Denined!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to Log In to do that!");
        res.redirect("back");
    }
}

middlewareOBJ.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You need to Log In to do that!");
        res.redirect("/login");
    }
};


module.exports = middlewareOBJ;


