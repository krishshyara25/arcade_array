const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/search', friendsController.searchUsers);
router.get('/requests/:userId', friendsController.getReceivedFriendRequests);
router.post('/friend-request', friendsController.sendFriendRequest);
router.post('/accept-friend-request', friendsController.acceptFriendRequest);
router.post('/reject-friend-request', friendsController.rejectFriendRequest);
module.exports = router;
