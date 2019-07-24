const mongoose        = require(`mongoose`);
const Campground      = require("./models/campgrounds");
const Comment         = require("./models/comments");
let data = [
    {
        name:"A few pugs",
        image:"https://images.unsplash.com/photo-1499938971550-7ad287075e0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"A picture of a few pugs. They are awesome!"
    },
    {
        name:"A cozy pug",
        image:"https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"A picture of a cozy pug. It is very cute!"
    },
    {
        name:"A thoughtful pug",
        image:"https://images.unsplash.com/photo-1485358370836-4fb8998c06f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"A picture of a thoughtful pug. Very profound!"
    }

]

function seedDB(){
    //Remove Campgrounds
    Campground.remove({}, (err)=>{
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");

            Comment.remove({}, (err)=>{
                if(err){
                    console.log(err);
                } else {
                    console.log("Comments removed");
                }
            });


            // //add a few campgrounds
            // data.forEach((seed)=>{
            //     Campground.create(seed, (err, campground)=>{
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("Campground added to DB!");
            //             //add comments
            //             Comment.create(
            //                 {
            //                     text:"Awesome pug!", 
            //                     author:"Me"
            //                 }, (err, comment)=>{
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Comment added!");
            //                     }
            //                 }
            //             )
            //         }
            //     });
            // });
        }
    });

 

}

module.exports = seedDB;
