const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secratekey = process.env.SECRATEKEY;

const useSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  phone: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

useSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

useSchema.methods.genrateAuthtoken = async function (req, res) {
  try {
    const Token = jwt.sign({ _id: this._id }, secratekey, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({
      token: Token,
    });
    await this.save();
    return Token;
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
};

const users = new mongoose.model("users", useSchema);
module.exports = users;
