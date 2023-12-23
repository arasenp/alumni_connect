const express = require('express');
const router = express.Router();
const { getUniqueEvent, addEvent, updateEvent, deleteEvent, getAllEvents, getUserEvents } = require('../../controllers/eventController');
const { protect } = require('../../middleware/auth');

//Event management routes
router.route("/all").get(getAllEvents);
router.route("/add").post(protect, addEvent);
router.route("/user").get(protect, getUserEvents);
router.route("/update/:eventID").patch(protect, updateEvent);
router.route("/delete/:eventID").delete(protect, deleteEvent);
router.route("/:eventID").get(protect, getUniqueEvent);


module.exports = router;