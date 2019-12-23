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



//경험프로필 등록
// @route POST profiles/experience/
// @desc Add experience to profile
// @ private
router.post("/experience", auth_check, profileController.post_exp);


//교육프로필 등록
// @route POST profiles/education
// @desc Add education to profile
// @access private
router.post("/education", auth_check, profileController.post_edu);


//경험프로필 내용 삭제
// @route DELETE profiles/experience/exp_id
// @desc Delete experience from profile
// @access private
router.delete("/experience/:exp_id", auth_check, profileController.delete_exp);


//교육프로필 내용 삭제
// @route DELETE profile/education/:edu_id
// @desc Delete education from profile
// @access private
router.delete("/education/:edu_id", auth_check, profileController.delete_edu);




module.exports = router;