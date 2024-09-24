const secratekey = process.env.SECRATEKEY;
const jwt = require("jsonwebtoken");
const datas = require("../model/useShcema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifytoken = jwt.verify(token, secratekey);

    const rootUser = await datas.findOne({ _id: verifytoken._id });

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = authenticate;
