const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_check = passport.authenticate("jwt", {session : false});

const postModel = require("../models/posts");
const profileModel = require("../models/profiles");

const validatePostInput = require("../validation/post");

const postController = require("../controllers/posts");



// 포스팅하기
// @route POST /posts
// @desc Create post
// @access private
// @route POST /posts
// @desc Create post
// @access private
router.post("/", auth_check, postController.post_doPost);



// 포스트 불러오기
// @route GET /posts
// @desc Get post
// @access public
router.get("/", postController.get_post_all);




// 포스트 상세정보 불러오기
// @route GET /posts/:post_id
// @desc Detail Get post
// @access private
router.get("/:post_id", auth_check, postController.get_post_detail);




// 포스트 업데이트
// @route POST /posts/
// @desc update post
// @access private
router.post("/", auth_check, postController.post_update);





// 포스팅 삭제
// @route POST /posts/
// @desc update post
// @access private
router.delete("/:post_id", auth_check, postController.delete_post);



// 포스트 좋아요하기
// @route POST /posts/like/:post_id
// @desc Like post
// @access private
router.post("/like/:post_id", auth_check, postController.like_post);




// 포스트 좋아요해제
// @route POST /posts/unlike/:post_id
// @desc UnLike post
// @access private
router.post("/unlike/:post_id", auth_check, postController.unlike_post);




module.exports = router;
