const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_check = passport.authenticate("jwt", {session : false});


const postController = require("../controllers/posts");



// 포스팅하기
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




// 포스트 답글 등록
// @route POST /posts/comment/:post_id
// @desc Add comment to post
// access private
router.post("/comment/:post_id", auth_check, postController.post_comment);





// 포스트 답글 삭제
// @route DELETE /posts/comment/:post_id/:comment_id
// @desc delete comment to post
// access private
router.delete("/comment/:post_id/:comment_id", auth_check, postController.delete_comment);




module.exports = router;
