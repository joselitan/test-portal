const {
  findAllUsers,
  createUserRecord,// : createUserService,
  findUserById
} = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();

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
        const newUser = await createUserRecord(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        console.error(error);

        res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
};



module.exports = {
  getUsers,
  createUser,
  getUser
};