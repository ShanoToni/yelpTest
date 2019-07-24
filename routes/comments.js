const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");
const middleware = require("../middleware/index");

//comments New
router.get("/new",middleware.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
    
});

//Comments Create
router.post("/", middleware.isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, (err,comment)=>{
                if(err){
                    console.log(err);
                } else{
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment Added!");
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOnwer, (req,res) =>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
        }
    })
    
});

//UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOnwer, (req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete Route
router.delete("/:comment_id",middleware.checkCommentOnwer, (req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            res.redirect("back");
            console.log(err);
        } else{
            req.flash("success", "Comment Deleted!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
})


module.exports = router;