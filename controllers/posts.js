const validatePostInput = require("../validation/post");

const postModel = require("../models/posts");
const profileModel = require("../models/profiles");


//포스팅
exports.post_doPost = (req, res) => {


    const {errors, isValid} = validatePostInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new postModel ({
        text : req.body.text,
        name : req.user.name,
        avatar : req.user.avatar,
        user : req.user.id
    });

    newPost
        .save()
        .then(post => {
            res.status(200).json({
                msg : "successful posting",
                postInfo : post
            });
        });
};




//포스트 불러오기
exports.get_post_all = (req, res) => {


    postModel
        .find()
        .then(posts => {
            const response = {
                count : posts.length,
                posts : posts.map(post => {
                    return {
                        id : post._id,
                        name : post.name,
                        text : post.text,
                        avatar : post.avatar,
                        likes : post.likes,
                        comments : post.comments,
                        date : post.date
                    }
                })
            };

            res.status(200).json(response);

        });
};





//포스팅 수정하기
exports.post_update = (req, res) => {

    const postFields = {};
    postFields.user = req.user.id;
    if (req.body.text) postFields.text = req.body.text;

    postModel
        .findOne({user : req.user.id})
        .then(post => {
            postModel
                .findOneAndUpdate(
                    {user : req.user.id},
                    {$set : postFields},
                    {new : true}
                )
                .then(post => {
                    res.status(200).json({
                        msg : "update postInfo",
                        postInfo : post
                    });
                });
        });

};





//상세 포스팅 불러오기
exports.get_post_detail = (req, res) => {
    postModel
        .findById(req.params.post_id)
        .then(post => {
            res.status(200).json({
                msg : "successful detail post data",
                postInfo : post
            });
        });
};





//포스팅 삭제하기
exports.delete_post = (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            postModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(400).json({
                            msg : "user not authorized"
                        });
                    }
                    post
                        .remove()
                        .then(() => {
                            res.status(200).json({
                                msg : "deleted post"
                            });
                        });
                });
        });
};




//포스팅 좋아요하기
exports.like_post = (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            postModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({
                            msg : "user already liked this post"
                        });
                    }
                    post.likes.unshift({user : req.user.id})
                    post.save()
                        .then(post => {
                            res.status(200).json({
                                postInfo : post
                            });
                        });
                })
                .catch(err => {
                    res.status(404).json({
                        msg : "No post found"
                    });
                });
        });
};





//포스팅 좋아요 해제
exports.unlike_post = (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            postModel
                .findById(req.params.post_id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({
                            msg : "You have not liked this post"
                        });
                    }
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    //save
                    post.save()
                        .then(post => {
                            res.status(200).json(post);

                        });
                })
                .catch(err => {
                    res.status(400).json({
                        msg : "No post found"
                    });
                });
        })
};



//포스팅 답글 등록
exports.post_comment = (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    postModel
        .findById(req.params.post_id)
        .then(post => {
            const newComment = {
                text : req.body.text,
                name : req.user.name,
                avatar : req.user.avatar,
                user: req.user.id
            };

            //add to comment out of array
            post.comments.unshift(newComment);

            //save
            post
                .save()
                .then(post => {
                    res.status(200).json(post);
                });
        })
        .catch(err => {
            res.status(404).json({
                msg : "포스트를 찾지 못했습니다."
            });
        });
};




//포스팅 답글 삭제
exports.delete_comment = (req, res) => {
    postModel
        .findById(req.params.post_id)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                req.status(404).json({
                    msg : "답글이 존재하지 않습니다."
                });
            }
            //get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            //splice comment out of array
            post.comments.splice(removeIndex, 1);
            post
                .save()
                .then(post => {
                    res.status(200).json(post);
                });
        });
};