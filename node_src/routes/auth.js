// Import dependencies
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const path = require('path');
const fs = require("fs");
const multer= require("multer");
// Import User Schema
const User = require('../models/User');

// Import middleware
const checkJWT = require('../middleware/check-jwt');


// upload localhost
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'dist/assets/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
    }
  })
const upload= multer({storage: storage}).single("profile_pic");


// Delete profile pic when uploading a new one or pic reset
const deleteProfilePic = function (imageURL) {



            let filePath= "dist/" + imageURL
            fs.unlinkSync(filePath, (err)=>{
                if(err){
                    //send an error if the image was not deleted
                    console.log("couldnt delete " +req.user + " image");
                }


            });
}





// ********************************
// USER AUTHENTICATION ROUTES
// ********************************
// Register a user
router.post('/register', (req, res, next) => {

  // Identify user
  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  // Checks if user exists in the database
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      res.json({ success: false, message: 'Email already in use' });
    } else {
      user.save();
      const token = jwt.sign({ user }, keys.JWT.secret, { expiresIn: '7d' });
      res.json({ success: true, message: 'Registration successful', token });
    }
  });
});

// Login a user
router.post('/login', (req, res, next) => {

  // Checks user's information against the database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.json({ success: false, message: 'Invalid email/password combination' });
    } else if (user) {
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({ success: false, message: 'Invalid email/password combination' });
      } else {
        user.lastLogin = Date.now();
        user.save();
        const token = jwt.sign({ user }, keys.JWT.secret, { expiresIn: '7d' });
        res.json({ success: true, message: "Login successful", token });
      }
    }
  });
});

// ********************************
// PROFILE ROUTES
// ********************************
router.route('/profile')
  // Get a user's profile
  .get(checkJWT, (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);
      let filteredUser = {
        email: user.email,
        displayName: user.displayName,
        imageURL: user.imageURL,
        created: user.created,
        lastLogin: user.lastLogin
      }
      res.json({ success: true, message: 'User profile retrieved', user: filteredUser });
    });
  })

  // Update a user's profile
  .post([checkJWT, upload], (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);

      // Delete previous profile pic
  // if (user.hasUploadedImage) deleteProfilePic(user.imageURL);

      // Update displayName, password, and/or image data
      if (req.body.displayName) user.displayName = req.body.displayName;
      if (req.body.password) user.password = req.body.password;
      if (req.file !== undefined) {
        user.imageURL = '/assets/'+req.file.filename;
        user.hasUploadedImage = true;
      }

      // Save updates to database
      user.save();
      res.json({ success: true, message: 'Profile information saved successfully' });
    });
  });

// Reset a user's profile image
router.post('/reset', checkJWT, (req, res, next) => {
    User.findById(req.decoded.user._id, (err, user) => {
      if (err) return next(err);

      // Delete previous profile pic
  //    if (user.hasUploadedImage) deleteProfilePic(user.imageURL);

      // Reset image keys to default
      user.imageURL = req.body.imageURL;
      user.hasUploadedImage = false;

      // Save updates to database
      user.save();
      res.json({ success: true, message: 'Profile information saved successfully' });
  });
});

module.exports = router;
