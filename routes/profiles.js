const express = require("express");
const passport = require("passport");

const router = express.Router();



const auth_check = passport.authenticate("jwt", {session : false});

const profileController = require("../controllers/profiles");


//프로필 등록&수정하기
// @route   POST    http://localhost:1234/
// @desc    post&update profile
// @access  private
router.post("/", auth_check, profileController.post_profile);




//프로필 불러오기
// @route   GET    http://localhost:1234/
// @desc    get profileInfo
// @access  private
router.get("/", auth_check, profileController.get_profile);




//프로필 삭제하기
// @route   DELETE    http://localhost:1234/
// @desc    delete profile
// @access  private
router.delete("/", auth_check, profileController.delete_profile);


//핸들 불러오기
// @route GET profiles/handle/:handle
// @desc Get profile by handle
// @ public
router.get("/handle/:handle", profileController.get_handle);





module.exports = router;