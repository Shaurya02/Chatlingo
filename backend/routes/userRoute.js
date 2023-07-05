const express = require("express");
const router = express.Router();
const User = require("../models/userdb");

async function addUser(userData){
    const newUser = new User({
        name: userData.name,
        email: userData.name,
        password: userData.password,
        level: 0
    });
    newUser.save();
    return true;
}

router.post("/new-user", async (req, res) => {
    const data = req.body;
    if (addUser(data)) {
      res.sendStatus(200);
    }
  });
  
  module.exports = router;