const datas = require("../../model/useShcema");
const bcrypt = require("bcryptjs");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).json({ status: 404, message: "Fill All The Details" });
    } else {
      const user = await datas.findOne({ email: email });

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
