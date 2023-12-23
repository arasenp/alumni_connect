const express = require('express');
const router = express.Router();
const { getAllUsers, getUniqueUser, addEvent, removeEvent, getCurrentUser } = require('../../controllers/userController');
const { protect } = require('../../middleware/auth');

//User management routes
router.route("/all").get(getAllUsers);
router.route("/current").get(protect, getCurrentUser);
router.route("/add-event").post(protect, addEvent);
router.route("/remove-event").post(protect, removeEvent);
router.route("/:userID").get(protect, getUniqueUser);

module.exports = router;