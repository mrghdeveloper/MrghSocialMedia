const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email.toLowerCase(),
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
      relationship: req.body.relationship,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
      //evaluate email
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      // !user && res.status(404).json("user not found");
      
      //evaluate password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      // !validPassword && res.status(400).json("wrong password");
  
      res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
      }
  });

module.exports = router;