const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);

module.exports = router;