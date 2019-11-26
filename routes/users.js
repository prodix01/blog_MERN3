const express = require("express");
const router = express.Router();

//회원가입
// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {

});


//로그인
// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", (req, res) => {

});


// 유저 불러오기
// @route   GET    http://localhost:1234/users/
// @desc    get user
// @access  private
router.get("/register", (req, res) => {

});


//유저정보 삭제
// @route   DELETE    http://localhost:1234/users/:user_id
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", (req, res) => {

});


module.exports = router;