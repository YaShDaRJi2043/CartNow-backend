const users = require("../../../model/useShcema");

exports.getAllUsers = async (req, res) => {
  try {
    const usersData = await users.find();
    res.status(201).json({ status: 201, usersData });
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
};
