const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = await Post.create({
      content,
      image,
      author: req.user._id,
    });

    res.status(201).json({
      message: "Post Created",
      post,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate(
        "author",
        "name email profilePic"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getPost = async (req, res) => {
  try 
  {
    const post = await Post.findById(req.params.id).populate("author","name email profilePic");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } 
  catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      message: alreadyLiked? "Post Unliked": "Post Liked",
      likes: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).json({
      message: "Comment Added",
      comments: post.comments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {createPost,getPosts,getPost,likePost,addComment};