const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async (email, user) => {
    //Assume this code is complete

    const token = jwt.sign(
        {identifier:user._id},
        "thisKeyIsSupposedToBeSecret"
    );
    return token;
};

module.exports = exports;

// exports.getToken = async (email, user) => {
//     const secretKey = "thisKeyIsSupposedToBeSecret"; // Replace with a secure key from an environment variable
//     const payload = { 
//         email, 
//         identifier: user._id 
//     };

//     // Configure token expiration time
//     const options = {
//         expiresIn: "1h", // Token valid for 1 hour
//     };

//     // Sign and return the token
//     const token = jwt.sign(payload, secretKey, options);
//     return token;
// };

// module.exports = exports;
