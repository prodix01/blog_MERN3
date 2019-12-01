const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/users");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


//회원가입
exports.user_register = (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        res.status(400).json(errors)
    }

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (user) {
                errors.msg = "이미 존재하는 이메일입니다.";
                return res.status(400).json(errors);
            }

            const avatar = gravatar.url(req.body.email, {
                s : 200,    //size
                r : "pg",   //rating
                d : "mm"    //default
            });

            const newUser = new userModel({
                name : req.body.name,
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
};






//로그인
exports.user_login = (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                errors.msg = "이메일이 존재하지 않습니다.";
                return res.status(400).json(errors);
            }
            else {
                //패스워드 매칭
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            errors.msg = "비밀번호가 틀렸습니다.";
                            return res.status(400).json(errors);
                        }
                        else {
                            //토큰에 들어갈 유저정보
                            const payload = {
                                id : user.id,
                                name : user.name,
                                avatar : user.avatar
                            };

                            //sign token
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                {expiresIn : 36000},
                                (err, token) => {
                                    res.status(200).json({
                                        msg : "로그인 성공! (토큰반환)",
                                        token : "bearer " + token
                                    });
                                });
                        }
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err.message
            });
        });
};





//유저정보 삭제
exports.user_delete = (req, res) => {

};





//유저정보 불러오기
exports.user_get = (req, res) => {
    res.status(200).json({
        id : req.user.id,
        name : req.user.name,
        avatar : req.user.avatar
    });
};