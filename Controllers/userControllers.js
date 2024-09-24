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

//user address
exports.address = async (req, res) => {
  const { email, pin, house, area, landmark, city, state, time } = req.body;
  console.log(email, pin, house, area, landmark, city, state, time);
  try {
    if (
      !email ||
      !pin ||
      !house ||
      !area ||
      !landmark ||
      !city ||
      !state ||
      !time
    ) {
      res.status(404).json({ status: 404, message: "Fill all the detail" });
    }
    const data = {
      pin,
      house,
      area,
      landmark,
      city,
      state,
      time,
    };

    const Usercontact = await datas.findOne({ _id: req.userId });
    console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const addressData = await Usercontact.addressdata(data);
      res.status(201).json(addressData);

      await Usercontact.save();
      console.log(addressData + " thse save wait kr");
      console.log(Usercontact + "userjode save");
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};

//admin register
exports.adminPost = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(name, email, phone, password);
  try {
    if (!name || !email || !phone || !password) {
      res.status(404).json({ status: 404, message: "Fill all the data" });
    }

    const preuser = await admins.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(404).json({ status: 404, message: "email was already taken" });
    } else {
      const details = new admins({
        name,
        email,
        phone,
        password,
      });

      const finaldata = await details.save();
      res.status(201).json({ status: 201, finaldata });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 404, message: "enter valid detais" });
  }
};

//admin login
exports.adminSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      res.status(404).json("fill all data");
    }

    const uservalid = await admins.findOne({ email: email });

    if (uservalid) {
      const checkuser = await bcrypt.compare(password, uservalid.password);
      console.log(checkuser);

      if (!checkuser) {
        res.status(404).json({ status: 404, messge: "invalid detail" });
      } else {
        res.status(201).json({ status: 201, uservalid });
      }
    }
  } catch (error) {
    console.log("data error");
    res.status(404).json({ status: 404, error });
  }
};

//add mobile
exports.mobile = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;
  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = await mobiles({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const finaldata = await data.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

// add electronic
exports.electronic = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;

  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = new electronics({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const finaldata = await data.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

//add men
exports.men = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;

  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = new mens({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const finaldata = await data.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

// add women
exports.women = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;

  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = new womens({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const finaldata = await data.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

// home&kitchen
exports.homekitchen = async (req, res) => {
  const { url, shortTitle, longTitle, mrp, cost, discount, description } =
    req.body;

  try {
    if (
      !url ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description
    ) {
      res.status(404).json({ status: 404, message: "fill all the data" });
    }
    const data = new homekitchens({
      url,
      shortTitle,
      longTitle,
      mrp,
      cost,
      discount,
      description,
    });
    const finaldata = await data.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(404).json({ status: 404, message: "data not post" });
  }
};

//send link for forgot password and also check user exist or not
exports.link = async (req, res) => {
  const { send_mail } = req.body;
  console.log(send_mail);

  try {
    if (!send_mail) {
      res.status(404).json({ status: 404, message: "Fill all the detail" });
    }

    const userfind = await datas.findOne({ email: send_mail });
    console.log("userfind", userfind);

    const token = jwt.sign({ _id: userfind._id }, secratekey, {
      expiresIn: "120s",
    });
    console.log("token", token);

    const setusertoken = await datas.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );
    console.log("setusertoken", setusertoken);

    if (setusertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: send_mail,
        subject: "Sending email for password reset",
        text: `this link valid for 2 minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
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

//user veryfiaction for forgot password
exports.veryfiaction = async (req, res) => {
  const { id, token } = req.params;
  console.log(id, token);
  try {
    const validuser = await datas.findOne({ _id: id, verifytoken: token });
    console.log("validuser", validuser);

    const verifyToken = jwt.verify(token, secratekey);
    console.log("verifyToken", verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(404).json({ status: 404, message: "user dose not exist" });
    }
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
};

exports.newPass = async (req, res) => {
  const { id, token } = req.params;
  const { pass } = req.body;
  try {
    const validuser = await datas.findOne({ _id: id, verifytoken: token });
    console.log("validuser", validuser);

    const verifyToken = jwt.verify(token, secratekey);
    console.log("verifyToken", verifyToken);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(pass, 12);
      console.log("newpassword", newpassword);

      const setNewUserPassword = await datas.findByIdAndUpdate(
        { _id: id },
        { password: newpassword },
        { new: true }
      );

      setNewUserPassword.save();
      console.log("setNewUserPassword", setNewUserPassword);
      res.status(201).json({ status: 201, setNewUserPassword });
    } else {
      res.status(404).json({ status: 404, error });
    }
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
};

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
