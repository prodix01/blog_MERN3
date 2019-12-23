const express = require("express");
const passport = require("passport");

const router = express.Router();



const auth_check = passport.authenticate("jwt", {session : false});

const {
    post_profile,
    get_profile,
    delete_profile,
    post_Edu,
    post_Exp,
    delete_Exp,
    delete_Edu,
    get_handle
} = require("../controllers/profiles");


//프로필 등록&수정하기
// @route   POST    http://localhost:1234/
// @desc    post&update profile
// @access  private
router.post("/", auth_check, post_profile);




//프로필 불러오기
// @route   GET    http://localhost:1234/
// @desc    get profileInfo
// @access  private
router.get("/", auth_check, get_profile);




//프로필 삭제하기
// @route   DELETE    http://localhost:1234/
// @desc    delete profile
// @access  private
router.delete("/", auth_check, delete_profile);


//핸들 불러오기
// @route GET profiles/handle/:handle
// @desc Get profile by handle
// @ public
router.get("/handle/:handle", get_handle);



//경험프로필 등록
// @route POST profiles/experience/
// @desc Add experience to profile
// @ private
router.post("/experience", auth_check, post_Exp);


//교육프로필 등록
// @route POST profiles/education
// @desc Add education to profile
// @access private
router.post("/education", auth_check, post_Edu);


//경험프로필 내용 삭제
// @route DELETE profiles/experience/exp_id
// @desc Delete experience from profile
// @access private
router.delete("/experience/:exp_id", auth_check, delete_Exp);


//교육프로필 내용 삭제
// @route DELETE profile/education/:edu_id
// @desc Delete education from profile
// @access private
router.delete("/education/:edu_id", auth_check, delete_Edu);




module.exports = router;