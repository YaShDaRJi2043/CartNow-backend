const bcrypt = require("bcryptjs");

const users = require("../../../model/useShcema");
const sendMail = require("../../../helper/sendMail");

//user register
exports.userRegister = async (req, res) => {
  const { name, lastName, email, phone, password } = req.body;
  try {
    if (!name || !lastName || !email || !phone || !password) {
      res.status(404).json({ status: 404, message: "Fill All The Detail" });
    } else if (phone.length < 10) {
      res
        .status(404)
        .json({ status: 404, message: "Enter A Valid Phone Number" });
    } else if (password.length < 6) {
      res
        .status(404)
        .json({ status: 404, message: "Password Have At-least 6 Letter" });
    } else {
      const emailFound = await users.findOne({ email: email });

      const phoneFound = await users.findOne({ phone: phone });

      if (emailFound) {
        res.status(404).json({ status: 404, message: "Email Is Already Used" });
      } else if (phoneFound) {
        res
          .status(404)
          .json({ status: 404, message: "Phone Number Is Already Used" });
      } else {
        const userDetails = new users({
          name,
          lastName,
          email,
          phone,
          password,
        });

        const userData = await userDetails.save();
        res.status(201).json({ status: 201, userData });
      }
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//user login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).json({ status: 404, message: "Fill All The Details" });
    } else {
      const user = await users.findOne({ email: email });

      if (user) {
        const checkUserPass = await bcrypt.compare(password, user.password);

        if (!checkUserPass) {
          res.status(404).json({ status: 404, message: "Wrong Password" });
        } else {
          const token = await user.genrateAuthtoken();
          res.status(201).json({ status: 201, token, user });
        }
      } else {
        res.status(404).json({ status: 404, message: "invalid details" });
      }
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//user logout
exports.userLogout = async (req, res) => {
  console.log(req);

  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((ele) => {
      return ele.token !== req.token;
    });

    req.rootUser.save();
    res.status(201).json({ status: 201, message: "user logout" });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//generate link for forgot password and send throw mail
exports.forgotPassword = async (req, res) => {
  const { send_mail } = req.body;

  try {
    if (!send_mail) {
      return res
        .status(404)
        .json({ status: 404, message: "Fill all the detail" });
    }

    const userfind = await users.findOne({ email: send_mail });
    if (!userfind) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
      expiresIn: "120s",
    });

    userfind.verifytoken = token;
    const setusertoken = await userfind.save();

    const link = `http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`;

    const mailResult = await sendMail({
      to: send_mail,
      slug: "reset-password",
      data: { name: userfind.name, link },
    });

    if (mailResult.success) {
      return res.status(201).json({ status: 201, message: "Email sent" });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Email not sent",
        error: mailResult.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Enter valid details",
      error: error.message,
    });
  }
};

//verify forgot-password link
exports.verifyLink = async (req, res) => {
  try {
    const { id, token } = req.params;

    const validuser = await users.findOne({ _id: id, verifytoken: token });
    console.log("validuser", validuser);

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
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

//update password to new password
exports.newPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { pass } = req.body;

    const validuser = await datas.findOne({ _id: id, verifytoken: token });
    console.log("validuser", validuser);

    const verifyToken = jwt.verify(token, secratekey);
    console.log("verifyToken", verifyToken);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(pass, 12);
      console.log("newpassword", newpassword);

      validuser.password = newpassword;
      validuser.verifytoken = null;
      await validuser.save();

      res
        .status(201)
        .json({ status: 201, message: "Password updated successfully" });
    } else {
      res.status(404).json({ status: 404, error });
    }
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
};
