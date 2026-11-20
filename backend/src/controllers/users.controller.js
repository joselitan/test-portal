const {
  getAllUsers,
  createUser: createUserService
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
        const newUser = await createUserService(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
  getUsers,
  createUser
};