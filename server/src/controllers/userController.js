const User = require("../models/User");
const { Event } = require("../models/Event");
const { userIdFromReq } = require("../utils/helperFuncs");

//User management controllers
exports.getUniqueUser = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user_id = userIdFromReq(req);

    const user = await User.findById(user_id);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.addEvent = async (req, res, next) => {
  const { eventID } = req.body;
  try {
    const user_id = userIdFromReq(req);

    const event = await Event.findById(eventID).exec();

    const user = await User.updateOne(
      {_id: user_id, "events._id": { $ne: event._id }},
      { $push: { events: event } }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.removeEvent = async (req, res, next) => {
  const { eventID } = req.body;
  try {
    const user_id = userIdFromReq(req);

    const user = await User.updateOne(
      {_id: user_id, "events._id": { $eq: eventID }},
      { $pull: { events: { _id: eventID } } }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
