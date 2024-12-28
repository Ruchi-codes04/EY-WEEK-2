const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    lastName: {
        type: String,
        required:false,
    },
    email: {
        type: String,
        required:true,
    },
    username: {
        type: String,
        required:true,
    },
    likedSongs: {
        // change this to array later
        type: String,
        default:"",
    },
    likedPlaylists: {
         // change this to array later
        type: String,
        default:"",
    },
    subscribedArtists:{
        // change this to array later
       type: String,
       default:"",
   },
   // can be added more fields as required...
    
    
});



const UserModel = mongoose.model("User", User);
module.exports = UserModel;