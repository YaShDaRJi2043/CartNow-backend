const admin_route = require("./admin");
const user_route = require("./user");

module.exports = (app) => {
  app.use("/admin", admin_route);
  app.use("/user", user_route);
};
