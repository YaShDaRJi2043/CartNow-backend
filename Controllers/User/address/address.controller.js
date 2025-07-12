const addresses = require("../../../model/addressShcema");

//add address
exports.addAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { pin, house, area, landmark, city, state, addressType } = req.body;

    if (
      !id ||
      !pin ||
      !house ||
      !area ||
      !landmark ||
      !city ||
      !state ||
      !addressType
    ) {
      res.state(404).json({ status: 404, message: "Fill All The Details" });
    } else {
      const userAddress = new addresses({
        userId: id,
        pin,
        house,
        area,
        landmark,
        city,
        state,
        addressType,
      });

      const userAddressData = await userAddress.save();
      res.status(201).json({ status: 201, userAddressData });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//get address
exports.getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const displayUserAddress = await addresses.find({ userId: id });
    res.status(201).json({ status: 201, displayUserAddress });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//update address
exports.updateAddress = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedAddress = await addresses.updateOne(
      { userRef: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ status: 201, updatedAddress });
  } catch (error) {
    res
      .status(500)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};

//delete address
exports.deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUserAddress = await addresses.findByIdAndDelete({
      _id: id,
    });
    res.status(201).json({ status: 201, deleteUserAddress });
  } catch (error) {
    res
      .status(404)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
