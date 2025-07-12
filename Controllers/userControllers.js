const datas = require("../model/useShcema");
const admins = require("../model/adminShcema");
const mobiles = require("../model/data/mobileShcema");
const electronics = require("../model/data/electronicShcema");
const mens = require("../model/data/mensShcema");
const womens = require("../model/data/womensSchema");
const homekitchens = require("../model/data/home&kitchenShcema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const password = process.env.PASSWORD;

const secratekey = process.env.SECRATEKEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: password,
  },
});

exports.buymail = async (req, res) => {
  const { email, cart } = req.body;
  console.log(cart + "cart");

  try {
    const buyuser = await datas.findOne({ _id: req.userId });
    console.log(buyuser + "user hain buy pr");

    if (!email) {
      res.status(404).json({ status: 404, message: "Fill all the detail" });
    }

    const userfind = await datas.findOne({ email: email });
    console.log("userfind", userfind);

    if (userfind) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you for purchase",
        text: `Hello ${userfind.name} your order is confirm it will be deliver in 2 to 3 days`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error" + error);
        } else {
          res.status(201).json({ status: 201, message: "email send" });
          console.log("email send" + info.response);
        }
      });
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Enter valid details" });
  }
};
