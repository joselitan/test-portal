const express = require('express');
const authMiddleware = require('../middleware/auth')
const authorize = require('../middleware/authorize')

const router = express.Router();

const {
  getUsers,
  getUser, 
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:id', getUser);

router.post(
  '/',
  authMiddleware, 
  createUser
);

router.put(
  '/:id',
  authMiddleware, 
  updateUser
);

router.delete(
  '/:id',
  authMiddleware, 
  authorize(1),   // Admin only
  deleteUser
);

module.exports = router;