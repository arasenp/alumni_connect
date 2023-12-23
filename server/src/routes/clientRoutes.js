const express = require('express');
const router = express.Router();
const { getClientRoute, getHomePage, getAboutPage, getAlumniPage, getEventsPage, getManagerPage, getAuthPage } = require('../controllers/clientController');
const { protect } = require('../middleware/auth');

router.route("/").get(getHomePage);
router.route("/about").get(getAboutPage);
router.route("/profile").get(protect, getAlumniPage);
router.route("/alumni-events").get(getEventsPage);
router.route("/manager").get(protect, getManagerPage);
router.route("/auth").get(protect, getAuthPage);


router.route("/test").get(getClientRoute);

module.exports = router;