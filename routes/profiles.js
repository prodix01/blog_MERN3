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
router.post("/", auth_check, (req,res) => {

    //필드 가져오기
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills - split into array 배열
    if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
    }

    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            new profileModel(profileFields)
                .save()
                .then(profile => {
                    res.status(200).json({
                        msg : "성공적으로 프로필을 등록했습니다.",
                        profileInfo : profile
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        error : err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });

});




//프로필 불러오기
// @route   GET    http://localhost:1234/
// @desc    get profileInfo
// @access  public
router.get("/", auth_check, (req, res) => {

});




//프로필 삭제하기
// @route   DELETE    http://localhost:1234/
// @desc    delete profile
// @access  public
router.delete("/", auth_check, (req, res) => {

});





module.exports = router;