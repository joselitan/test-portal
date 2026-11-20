const {
  getAllUsers
} = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

const createUser = async (req, res) => {
    try {
        const user = await createNewUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
  getUsers,
  createUser
};