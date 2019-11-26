const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const userController = require("../controllers/users");

const userModel = require("../models/users");

const auth_check = passport.authenticate("jwt", {session : false});

//회원가입
// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", userController.user_register);


//로그인
// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", userController.user_login);


// 유저 불러오기
// @route   GET    http://localhost:1234/users/
// @desc    get user
// @access  private
router.get("/", auth_check, userController.user_get);


//유저정보 삭제
// @route   DELETE    http://localhost:1234/users/:user_id
// @desc    delete userInfo
// @access  private
router.delete("/:user_id", userController.user_delete);


module.exports = router;