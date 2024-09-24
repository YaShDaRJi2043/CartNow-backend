const datas = require("../../model/useShcema");

exports.getCurrentLoginUserDetail = async (req, res) => {
  try {
    const currentLoginUser = await datas.findOne({ _id: req.userId });
    res.status(201).json(currentLoginUser);
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
