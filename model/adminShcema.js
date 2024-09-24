const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const useSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

useSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const admins = new mongoose.model("admins", useSchema);
module.exports = admins;
