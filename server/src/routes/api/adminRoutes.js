const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser } = require('../../controllers/adminController');
const { protect } = require('../../middleware/auth');



router.route("/create").post(protect, createUser);
router.route("/update/:userID").post(protect, updateUser);
router.route("/delete/:userID").delete(protect, deleteUser);


module.exports = router;