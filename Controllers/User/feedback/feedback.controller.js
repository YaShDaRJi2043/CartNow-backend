const feedbackShcema = require("../../../model/feedbackShcema");

exports.addFeedback = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newFeedback = new feedbackShcema({ email, message });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ status: 404, message: "Server error: " + error.message });
  }
};
