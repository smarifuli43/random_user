const express = require('express');
const usersControllers = require('../controllers/users.controller');

const router = express.Router();

router.get('/random', usersControllers.getRandomUser);
router.get('/all', usersControllers.getAllUsers);
router.post('/save', usersControllers.saveRandomUser);
router.patch('/update/:id', usersControllers.updateUser);
router.patch('/bulk-update', usersControllers.bulkUpdate);
router.delete('/delete/:id', usersControllers.deleteUser);

module.exports = router;
