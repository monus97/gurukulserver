const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: { type: String },
  email : {
    type: String,
  },
  password: { type: String },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  refrences: {
    type: String,
    enum: ["LinkedIn", "Friends", "JobPortal", "Others"],
  },
  city: {
    type: String,
    enum: ["Mumbai", "Pune", "Ahmedabad"],
  },
  state: {
    type: String,
    enum: ["  Gujarat", "Maharashtra", "Karnataka"],
  },

  phoneNumber: {
    type: Number,
  },
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("user", userSchema);
