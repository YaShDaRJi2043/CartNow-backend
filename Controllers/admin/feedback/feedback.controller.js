const users = require("../../../model/useShcema");

exports.getFeedback = async (req, res) => {
  try {
    const { email, feedback } = req.body;

    if (!email || !feedback) {
      res.status(404).json({ status: 404, message: "Fill all the detail" });
    }
    const data = {
      feedback,
    };

    const Usercontact = await users.findOne({ _id: req.userId });
    console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const feedbackData = await Usercontact.feedbackdata(data);
      res.status(201).json(feedbackData);

      await Usercontact.save();
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
};
