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

  verifytoken: {
    type: String,
  },

  carts: Array,
  Addresses: Array,
  feedbacks: [
    {
      feedback: {
        type: String,
      },
    },
  ],
  buyitems: Array,
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

// add to cart data
useSchema.methods.addcartdata = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error + "bhai cart add time aai error");
  }
};

// buyitems
useSchema.methods.buyitemdata = async function (buyitem) {
  try {
    this.buyitems = this.buyitems.concat(buyitem);
    await this.save();
    return this.buyitems;
  } catch (error) {
    console.log(error + "error");
  }
};

// address data
useSchema.methods.addressdata = async function (address) {
  try {
    this.Addresses = this.Addresses.concat(address);
    await this.save();
    return this.Addresses;
  } catch (error) {
    console.log(error + "not add");
  }
};

//feedback
useSchema.methods.feedbackdata = async function (feedback) {
  try {
    this.feedbacks = this.feedbacks.concat(feedback);
    await this.save();
    return this.feedbacks;
  } catch (error) {
    console.log(error + "not add");
  }
};

const datas = new mongoose.model("datas", useSchema);
module.exports = datas;
