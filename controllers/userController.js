const User = require('../models/userModel');
const { passwordHash } = require('../handlers');
const getTokenForUser = require('../services/token');
const cloudinary = require('cloudinary');

module.exports = {
  createUser: async (req, res) => {
    const user = req.body;
    !user.picture ? user.picture = 'http://laoblogger.com/images/default-profile-picture-5.jpg' : 
    await cloudinary.uploader.upload(user.picture, res => user.picture = res.url);
    const newUser = new User(user);
    newUser.save()
      .then(user => res.send({
        user: {
          username: user.username,
          email: user.email,
          liked: user.liked,
          picture: user.picture,
          _id: user._id,
        },
        token: getTokenForUser(user)
      }))
      .catch(err => res.status(422).json(err));
  },
  login: (req, res) => res.send({
    user: {
      username:req.user.username,
      email: req.user.email,
      liked: req.user.liked,
      picture: req.user.picture,
      _id: req.user._id 
    },
    token: getTokenForUser(req.user)
  }),
  auth: (req, res) => res.send({ 
    user: {
      username: req.user.username,
      email: req.user.email,
      liked: req.user.liked,
      picture: req.user.picture,
      _id: req.user._id }
    }),
  updateUser: async (req, res) => {
    if (req.body.password) req.body.password = await passwordHash(req.body.password);
    if (req.body.picture) {
      await cloudinary.uploader.upload(req.body.picture, res => req.body.picture = res.url);
    }
    User.findByIdAndUpdate(req.user._id, req.body, { new: true, select: 'username email password liked picture _id' })
      .exec((err, user) => err ? res.status(422).json(err) : res.send({ user }));
  },
  findUser: (req, res) => {
    const { id } = req.params;
    User.findById(id, '-password')
      .exec((err, user) => err ? res.status.json(err) : res.send({ user }));
  }
}