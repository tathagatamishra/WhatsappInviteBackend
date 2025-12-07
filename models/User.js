// models/User.js
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, // E.164 w/o '+' or with
  role: { type: String, enum: ["sender", "receiver"], required: true },
  displayName: String,
  whatsappSessionPath: String, // path or key for session credentials file
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", UserSchema);

// models/Event.js
const mongoose = require("mongoose");
const ReceiverSchema = new mongoose.Schema({
  phone: String,
  status: {
    type: String,
    enum: ["not-accepted", "accepted"],
    default: "not-accepted",
  },
  token: String, // unique token included in message link
  tokenExpiresAt: Date,
});
const EventSchema = new mongoose.Schema({
  code: { type: String, unique: true }, // 10-char alphanumeric
  title: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  receivers: [ReceiverSchema],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Event", EventSchema);
