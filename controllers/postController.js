const Post = require('../models/postModel');
const User = require('../models/userModel');
const cloudinary = require('cloudinary');


module.exports = {
  createPost: async (req, res) => {
    await cloudinary.uploader.upload(req.body.picture, res => req.body.picture = res.url);
    const { title, content, author, picture, tags } = req.body;
    const newPost = new Post({ title, content, author, picture, tags });
    newPost.save((err, post) => err ? res.status(422).json(err) : res.send({ id: post._id }));
  },
  getPost: (req, res) => {
    const { id } = req.params;
    Post.findById(id)
      .populate('author comments.author', 'username picture')
      .exec((err, post) => err ? res.status(422).json(err) : res.send({ post }));
  },
  getPosts: (req, res) => {
    Post.find({})
      .populate('author comments.author', 'username picture')
      .exec((err, posts) => err ? res.status(422).json(err) : res.send({ posts: posts.reverse() }));
  },
  getUsersPosts: (req, res) => {
    const { author } = req.body;
    Post.find({ author })
      .exec((err, posts) => err ? res.status(422).json(err) : res.send({ posts }));
  },
  addComment: (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    Post.findByIdAndUpdate(id, { "$push": { "comments": { text, author } } }, { new: true })
      .exec((err, post) => err ? res.status(422).json({ error: err }) : res.send(post));
  },
  addPostLike: (req, res) => {
    const { postId, authorId } = req.body;
    Post.findByIdAndUpdate(postId, { $push: { likes: authorId }})
      .exec((err) => err ? res.status(422).json({ error: err }) : '');
    User.findByIdAndUpdate(authorId, { $push: { liked: postId }}, 
      { new: true, select: 'username email liked picture _id' })
      .exec((err, user) => err ? res.status(422).json({ error: err }) : res.send(user));
  },
  removePostLike: (req, res) => {
    const { postId, authorId } = req.body;
    Post.findByIdAndUpdate(postId, { $pull: { likes: authorId }})
      .exec((err, post) => err ? res.status(422).json({ error: err }) : '');
    User.findByIdAndUpdate(authorId, { $pull: { liked: postId }}, 
      { new: true, select: 'username email liked picture _id' })
      .exec((err, user) => err ? res.status(422).json({ error: err }) : res.send(user));
  },
  deletePost: (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id)
      .exec((err, post) => err ? res.status(422).json({ error: err }) : res.send(post));
  },
  likeComment: (req, res) => {
    const { postId, commentId, userId } = req.body;
    Post.findById(postId)
      .exec((err, post) => {
        if (err) return res.status(422).json({ error: err });
        const index = post.comments.findIndex(comment => comment._id == commentId)
        post.comments[index].likes.push(userId);
        post.save((err2, newPost) => err2 ?  res.status(422).json({ error: err2 }) : res.send(newPost));
      });
  },
  removeLikeComment: (req, res) => {
    const { postId, commentId, userId } = req.body;
    Post.findById(postId)
      .exec((err, post) => {
        if (err) return res.status(422).json({ error: err });
        const index = post.comments.findIndex(comment => comment._id == commentId);
        post.comments[index].likes = post.comments[index].likes.filter(like => like != userId);
        post.save((err2, newPost) => err2 ?  res.status(422).json({ error: err2 }) : res.send(newPost));
      });
  },
  removeComment: (req, res) => {
    const { id } = req.params;
    Post.find({})
      .exec((err, posts) => {
        const postId = posts.filter(p => p.comments.some(c => c._id == id))[0]._id;
        Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: id }}}, { new: true })
          .exec((err2, post) => err2 ?  res.status(422).json({ error: err2 }) : res.send(post))
      });
  },
  topPosts: (req, res) => {
    Post.aggregate([
      {
        $project: {
          title: 1,
          author: 1,
          content: 1,
          picture: 1,
          tags: 1,
          created_at: 1,
          likes: 1,
          comments: 1,
          likeAmount: { $size: "$likes" }
        }
      },
      {
        $sort: { likeAmount: -1 }
      },
       {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { 
        $project: { "author.password": 0 }
      }
    ],  (err, posts) => {
      return err ? res.status(422).json({ error: err }) : res.send(posts);
    });
  },
  tagGroup: (req, res) => {
    Post.aggregate([
      {
        $unwind: "$tags"
      },
      { 
        $group: { _id: "$tags", tags: { $sum: 1 } }
      },
      {
        $sort: { tags: -1 }
      }
      
    ], (err, posts) => {
      return err ? res.status(422).json({ error: err }) : res.send(posts);
    });
  },
  usersGroup: (req, res) => {
    Post.aggregate([
      {
        $group: { _id: "$author", count: { $sum: 1 }}
      },
      {
        $sort: { count: -1 }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { 
        $project: { "author.password": 0 }
      }
    ], (err, users) => {
      return err ? res.status(422).json({ error: err }) : res.send(users);
    })
  }
}