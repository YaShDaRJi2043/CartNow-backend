exports.productRemoveFromCart = async (req, res) => {
  try {
    const id = req.query.id;

    req.rootUser.carts = req.rootUser.carts.filter((ele) => {
      return ele._id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser.carts);
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
