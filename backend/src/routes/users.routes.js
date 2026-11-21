const express = require('express');
const authMiddleware = require('../middleware/auth')
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
  createUser);

router.put(
  '/:id',
  authMiddleware, 
  updateUser);

router.delete(
  '/:id',
  authMiddleware, 
  deleteUser);

module.exports = router;