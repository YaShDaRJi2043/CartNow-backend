const admins = require("../../../model/adminShcema");

//admin register
exports.adminRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;
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
exports.adminLogin = async (req, res) => {
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
