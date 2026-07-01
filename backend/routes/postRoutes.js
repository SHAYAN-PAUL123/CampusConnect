const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createPost,getPosts,getPost, likePost, addComment} = require("../controllers/postController");

router.post("/" , protect , createPost);
router.get("/" , getPosts);
router.get("/:id", getPost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, addComment);

module.exports = router;