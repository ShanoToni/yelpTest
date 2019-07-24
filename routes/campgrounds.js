const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds")
const middleware = require("../middleware/index");

//Index
router.get("/", (req,res)=>{
    Campground.find({}, (err, campgrounds)=>{
        res.render("campgrounds/index" , {campgrounds:campgrounds, currentUser:req.user});
    })
    
});

//Campground Create
router.post("/", middleware.isLoggedIn, (req,res)=>{
    //get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id:req.user._id,
        username: req.user.username
    };
    let price = req.body.price;
    Campground.create( {name: name, price:price, image: image, description: desc, author: author}, (err,newCamp)=>{
        if(err){
            console.log(err);
        } else{
            req.flash("success", "Campground Created!");
            res.redirect("/campgrounds");        
        }
    } );
    //redirect back to campgrounds page
    
});

//Campground New Form
router.get("/new", middleware.isLoggedIn, (req,res)=>{
    res.render("campgrounds/new");
});

//Show
router.get("/:id", (req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, found)=>{
        if(err){
            console.log(err);
        } else {
            //render template with that campgounds
            res.render("campgrounds/show", {campground:found});
        }
    })
    
    
});

//EDIT Campground
router.get("/:id/edit",middleware.checkCampOwner, (req,res) =>{
   
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        } else { 
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
   
});

//Update Campground
router.put("/:id" ,middleware.checkCampOwner, (req, res) =>{
    Campground.findByIdAndUpdate(req.params.id,req.body.Campground, (err, updatedCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Updated!");
            res.redirect("/campgrounds/"+ req.params.id);
            
        }
    });
})

//Delete Campground
router.delete("/:id" ,middleware.checkCampOwner, (req,res) =>{
    Campground.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Deleted!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;