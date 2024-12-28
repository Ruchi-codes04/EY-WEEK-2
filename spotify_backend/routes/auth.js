const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");


//This POST route will help to register a user

router.post("/register" , async (req, res)=>{
    // This code is run when the / register api is called as a POST request.
    // My req.body will be of the format {email, password, firstname, lastname, username }

    const {email, password, firstName, lastName, username } = req.body;

    // Does the user with this mail already exist? if yes, throws an error.

    const user = await User.findOne({email: email});
    if (user) {
        // Status code by default is 200
        return res
        .status(403)
        .json({error:"A user with this email already exists"});
    }
    //This is a valid request

    //Create a new user in the DB.
    // do-not store the passwords in plain text, we convert the plain text passwords into a hash.
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username};
    const newUser = await User.create(newUserData);

    // we want to create a token to return to the user

    const token = await getToken(email, newUser);

    // return the result to the user

    const userToReturn = {...newUser.toObject(), token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn);



});

router.post("/login", async (req, res) => {
    //get email and password sent by user from req.body
    const {email, password} = req.body;

    //check if a user with the given email exists. If not, the credentials are invalid.
    const user = await User.findOne({email:email});
    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    // If user exists, check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);
    //This will be True or False.

    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    //if the credentials are correct, return a token to the user.

    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn);

});



module.exports = router;