const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const requireAuth = require('../services/auth').requireAuth;
const requireLogin = require('../services/auth').requireLogin;


module.exports = (server) => {
  server.route('/register')
    .post(userController.createUser)
    .put(requireAuth, userController.updateUser);
  server.route('/login')
    .post(requireLogin, userController.login);
  server.route('/post')
    .post(requireAuth, postController.createPost);
  server.route('/post/:id')
    .get(postController.getPost)
    .delete(requireAuth, postController.deletePost);
  server.route('/comment/:id')
    .put(requireAuth, postController.addComment)
    .delete(requireAuth, postController.removeComment);
  server.route('/comment/like')
    .post(requireAuth, postController.likeComment)
  server.route('/comment/removeLike')
    .post(requireAuth, postController.removeLikeComment);
  server.route('/posts')
    .get(postController.getPosts);
  server.route('/auth')
    .get(requireAuth, userController.auth);
  server.route('/usersPosts')
    .post(requireAuth, postController.getUsersPosts);
  server.route('/user/:id')
    .get(requireAuth, userController.findUser);
  server.route('/post/like')
    .put(requireAuth, postController.addPostLike);
  server.route('/post/removeLike')
    .put(requireAuth, postController.removePostLike);
  server.route('/browse/top')
    .get(postController.topPosts);
  server.route('/browse/tags')
    .get(postController.tagGroup);
  server.route('/browse/users')
    .get(postController.usersGroup);
};