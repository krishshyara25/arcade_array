const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/search', friendsController.searchUsers);
router.get('/users', friendsController.getAllUsers);
router.get('/requests/:userId', friendsController.getReceivedFriendRequests);
router.post('/friend-request', friendsController.sendFriendRequest);
router.post('/accept-friend-request', friendsController.acceptFriendRequest);
router.post('/reject-friend-request', friendsController.rejectFriendRequest);
router.get('/user_friends/:userId', friendsController.getUserFriends);
router.post('/remove-friend', friendsController.removeFriend);

module.exports = router;
