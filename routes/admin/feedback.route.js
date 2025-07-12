const router = require("express").Router();

const feedbackController = require("../../Controllers/admin/feedback/feedback.controller");
const authenticate = require("../../middlewere/authenticate");

router.get("/get", authenticate, feedbackController.getFeedback);

module.exports = router;
