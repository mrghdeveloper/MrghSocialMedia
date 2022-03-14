const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post a comment
router.put("/:id/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const newComment = {
            comment: req.body.newComment,
            userId: req.body.userId,
            profilePicture: req.body.profilePicture,
            username: req.body.username
        }
        await post.updateOne({ $push: { comments: newComment } });
        res.status(200).json("Your comment successfully posted")
    } catch (err) {
        res.status(500).json(err);
    }

});


//update a post

router.put("/:id", async (req, res) => { // id = Post Id
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err); // error: there is no such a post.
    }
});


//delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//like / dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Bookmark a post
// router.put("/:id/bookmark", async (req, res) => {
//     try {
//         const user = await User.findById(req.body.userId);
//         const post = await Post.findById(req.params.id);
//         if (!user.bookmarks.includes(req.params.id)) {
//             await user.updateOne({ $push: { bookmarks.bookmarkPostId: req.params.id, posts: post } });
//             res.status(200).json(" Post bookmarked successfully");
//         } else {
//             await user.updateOne({ $pull: { bookmarks: req.params.id, posts: post} })
//             res.status(200).json("Post got removed from bookmarks");
//         }

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.put("/:id/bookmark", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const post = await Post.findById(req.params.id);
        if (!user.bookmarkedPostIds.includes(req.params.id)) {
            await user.updateOne({ $push: { bookmarkedPostIds : req.params.id, bookmarkedPosts: post } });
            res.status(200).json(" Post bookmarked successfully");
        } else {
            await user.updateOne({ $pull: { bookmarkedPostIds : req.params.id, bookmarkedPosts: post} })
            res.status(200).json("Post got removed from bookmarks");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


//get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all bookmarked Posts

router.get('/bookmarks/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const bookmarkedPostsInfo = {
            bookmarkedPostIds: user.bookmarkedPostIds, 
            bookmarkedPosts: user.bookmarkedPosts
        }
        res.status(200).json(bookmarkedPostsInfo);

    } catch (err) {
        res.status(500).json(err);
    }
});


//get all comments
router.get("/:id/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post.comments);
    }catch (err) {
        res.status(500).json(err);
    }
});


//get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;