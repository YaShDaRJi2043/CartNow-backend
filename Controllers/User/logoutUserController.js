exports.userLogout = async (req, res) => {
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
