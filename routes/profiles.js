const express = require("express");
const passport = require("passport");

const router = express.Router();

const profileModel = require("../models/profiles");
const userModel = require("../models/users");

const auth_check = passport.authenticate("jwt", {session : false});


//프로필 등록하기
// @route   POST    http://localhost:1234/
// @desc    post profile
// @access  public
router.post("/", (req,res) => {

});




//프로필 불러오기
// @route   GET    http://localhost:1234/
// @desc    get profileInfo
// @access  public
router.get("/", (req, res) => {

});




//프로필 삭제하기
// @route   DELETE    http://localhost:1234/
// @desc    delete profile
// @access  public
router.delete("/", (req, res) => {

});





module.exports = router;