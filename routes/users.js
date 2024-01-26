// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const addUser = require('../controllers/userController');
const getUsers = require('../controllers/userController');
const getUserbyId = require('../controllers/userController');
const editUser = require('../controllers/userController');
const deleteUser = require('../controllers/userController');


// Create a new user
router.post('/', addUser);

// Get all users
router.get('/', getUsers);

// Get a specific user by ID
router.get('/:userId',getUserbyId);

// Update a user by ID
router.put('/:userId', editUser);

// Delete a user by ID
router.delete('/:userId',deleteUser);

module.exports = router;
