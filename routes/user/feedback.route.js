const router = require("express").Router();

const authenticate = require("../../middlewere/authenticate");
const feedbackController = require("../../Controllers/user/feedback/feedback.controller");

router.post("/add", authenticate, feedbackController.addFeedback);

module.exports = router;
