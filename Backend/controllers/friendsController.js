const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching games.' });
    }
  };

// Search users route
exports.searchUsers = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Send friend request route
exports.sendFriendRequest = async (req, res) => {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
        return res.status(400).json({ message: 'Both userId and targetUserId are required' });
    }

    try {
        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(targetUserId)) {
            return res.status(400).json({ message: 'You are already friends with this user' });
        }

        if (user.friendRequests.includes(targetUserId)) {
            return res.status(400).json({ message: 'You have already sent a friend request' });
        }

        user.friendRequests.push(targetUserId);
        await user.save();

        targetUser.friendRequests.push(userId);
        await targetUser.save();

        return res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Accept friend request route
exports.acceptFriendRequest = async (req, res) => {
    const { userId, senderId } = req.body;

    if (!userId || !senderId) {
        return res.status(400).json({ message: 'Both userId and senderId are required' });
    }

    try {
        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove sender from the recipient's friendRequests array
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId.toString());
        user.friends.push(senderId);  // Add sender to the user's friends array
        await user.save();

        // Remove user from the sender's friendRequests array
        sender.friendRequests = sender.friendRequests.filter(id => id.toString() !== userId.toString());
        sender.friends.push(userId);  // Add user to the sender's friends array
        await sender.save();

        return res.status(200).json({ message: 'Friend request accepted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
    

// Reject friend request route
exports.rejectFriendRequest = async (req, res) => {
    const { userId, senderId } = req.body;

    if (!userId || !senderId) {
        return res.status(400).json({ message: 'Both userId and senderId are required' });
    }

    try {
        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId.toString());
        await user.save();

        sender.friendRequests = sender.friendRequests.filter(id => id.toString() !== userId.toString());
        await sender.save();

        return res.status(200).json({ message: 'Friend request rejected' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Get friend requests received by the user route
exports.getReceivedFriendRequests = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId).populate('friendRequests', 'username email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the users who sent the friend requests
        const receivedRequests = user.friendRequests;

        return res.status(200).json({ receivedRequests });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


//to get user's friends
exports.getUserFriends = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('friends').lean(); // .lean() to return plain JSON

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.friends); // Now returns only the friends array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
};
