//Event management controllers
const { Event } = require("../models/Event");
const mongoose = require("mongoose");
const User = require("../models/User");
const { userIdFromReq } = require("../utils/helperFuncs");

exports.getUniqueEvent = async (req, res, next) => {
  const { eventID } = req.params;

  try {
    const uniqueEvent = await Event.findById(eventID);

    res.status(200).json({ success: true, data: uniqueEvent });
  } catch (error) {
    next(error);
  }
};

exports.addEvent = async (req, res, next) => {
  const { name, date, type, description } = req.body;

  const organiser_id = userIdFromReq(req);

  try {
    const newEvent = await Event.create({
      name,
      date,
      type,
      description,
      organiser_id,
    }).then(async (data) => {
      await User.updateOne({ _id: organiser_id }, { $push: { events: data } });
    });

    res.status(200).json({ success: true, data: newEvent });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  const { _id, name, date, type, description, organiser_id } = req.body;
  const { eventID } = req.params;

  try {
    const updatedEvent = await Event.updateOne(
      { _id: eventID },
      { _id, name, date, type, description, organiser_id }
    ).then(
      async (data) =>
        await User.updateMany(
          {
            "events._id": eventID,
          },
          {
            $set: {
              "events.$[elem]": { _id, name, date, type, description, organiser_id },
            },
          },
          {
            multi: true,
            arrayFilters: [
              {
                "elem._id": {
                  $eq: eventID,
                },
              },
            ],
          }
        )
    );
    res.status(200).json({
      success: true,
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  const { eventID } = req.params;

  const users = await User.find({});

  const deletedEvent = await Event.findByIdAndDelete(eventID).then(() => {
    users.map(async (user) => {
      await User.updateOne(
        { _id: user._id },
        { $pull: { events: { _id: eventID } } }
      );
    });
  });

  res.status(200).json({ success: true, data: deletedEvent });
  try {
  } catch (error) {
    next(error);
  }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

exports.getUserEvents = async (req, res, next) => {
  try {
    const user_id = userIdFromReq(req);

    const events = await User.findById(user_id).then((res) => res.events);

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};
