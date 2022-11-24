const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userID: String,
    name: String,
    email: String,
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
