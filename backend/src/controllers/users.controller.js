const {
  findAllUsers,
  createUserRecord,// : createUserService,
  findUserById,
  updateUserRecord,
  deleteUserRecord
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

const getUserStats = async (req, res) => {
    try {
        const users = await findAllUsers();

        const totalUsers = users.length;

        const admins = users.filter(
            user => user.role_id === 1
        ).length;

        const normalUsers = users.filter(
            user => user.role_id === 3
        ).length;

        res.status(200).json({
            totalUsers,
            admins,
            normalUsers
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await updateUserRecord(
            req.params.id,
            req.body
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to update user'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserRecord(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: 'User deleted',
            user: deletedUser
        });
    }   catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to delete user'
        });
    }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
};