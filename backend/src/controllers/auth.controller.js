const jwt = require('jsonwebtoken');

const {
  loginUser
} = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(
      email,
      password
    );

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleId: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error);

    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
};

module.exports = {
  login
};