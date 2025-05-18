const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "A user must have a phone number"],
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "A user must have an email"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "A user must have a password"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
