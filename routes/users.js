const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");


const userModel = require("../models/users");

//회원가입
// @route   POST    http://localhost:1234/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (user) {
                res.status(400).json({
                    msg : "이미 계정이 존재합니다."
                });
            }

            const avatar = gravatar.url(req.body.email, {
                s : 200,    //size
                r : "pg",   //rating
                d : "mm"    //default
            });

            const newUser = new userModel({
                name : req.body.userName,
                email : req.body.email,
                avatar : avatar,
                password : req.body.password,
            });

            //패스워드 암호화
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt
                    .hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        newUser
                            .save()
                            .then(user => {
                                res.status(200).json({
                                    msg : "회원가입성공",
                                    registerInfo : user
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error : err.message
                                });
                            });
                    });
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
});


//로그인
// @route   POST    http://localhost:1234/users/login
// @desc    login user
// @access  public
router.post("/login", (req, res) => {
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg : "존재하지 않는 이메일 입니다."
                });
            }
            else {
                //패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.passowrd)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({
                                msg : "비밀번호가 틀렸습니다."
                            });
                        }
                        else {
                            res.status(200).json({
                                msg : "로그인 성공! (토큰반환)"
                            });
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
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