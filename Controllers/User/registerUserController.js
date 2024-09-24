const datas = require("../../model/useShcema");

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
      const emailFound = await datas.findOne({ email: email });

      const phoneFound = await datas.findOne({ phone: phone });

      if (emailFound) {
        res.status(404).json({ status: 404, message: "Email Is Already Used" });
      } else if (phoneFound) {
        res
          .status(404)
          .json({ status: 404, message: "Phone Number Is Already Used" });
      } else {
        const userDetails = new datas({
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
