const express = require("express");
const datas = require("../model/useShcema");
const router = new express.Router();
const admins = require("../model/adminShcema");
const products = require("../model/productsShcema");
const authenticate = require("../middlewere/authenticate");
const mobiles = require("../model/data/mobileShcema");
const electronics = require("../model/data/electronicShcema");
const mens = require("../model/data/mensShcema");
const womens = require("../model/data/womensSchema");
const homekitchens = require("../model/data/home&kitchenShcema");
const controllers = require("../Controllers/userControllers");

//get user address      Done
router.post("/address", authenticate, controllers.address);

//admin register      Done
router.post("/Adminregister", controllers.adminPost);

//admin login     Done
router.post("/adminlogin", controllers.adminSignin);

//admin user manage
router.get("/getData", async (req, res) => {
  try {
    const data = await datas.find();
    res.status(201).json({ status: 201, data });
  } catch (error) {
    res.status(404).json({ status: 404, error });
  }
});

//MOBILE
//get mobile
router.get("/getmobiles", async (req, res) => {
  try {
    const mobilesdata = await mobiles.find();
    res.status(201).json(mobilesdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get one mobile
router.get("/getmobilesone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const x = await mobiles.findById({ _id: id });
    res.status(201).json(x);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
});

//add mobile
router.post("/mobileadd", controllers.mobile);

//delete mobile
router.delete("/mobile/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await mobiles.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
});

// edit/update mobile
router.put("/editmobile/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await mobiles.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

// ELECTRONICS
//get electronics
router.get("/getelectronics", async (req, res) => {
  try {
    const electronicsdata = await electronics.find();
    res.status(201).json(electronicsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get one electronics
router.get("/getelectronicsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const x = await electronics.findById({ _id: id });
    res.status(201).json(x);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
});

//add electronics
router.post("/electronicadd", controllers.electronic);

//delete electronics
router.delete("/electronic/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await electronics.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
});

// edit/update electronics
router.put("/editelectronic/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await electronics.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

//MEN FASHIONS
//get men fashions
router.get("/getmens", async (req, res) => {
  try {
    const mensdata = await mens.find();
    res.status(201).json(mensdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get one men fashion
router.get("/getmensone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const x = await mens.findById({ _id: id });
    res.status(201).json(x);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
});

//add men fashions
router.post("/mensadd", controllers.men);

//delete men fashions
router.delete("/men/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await mens.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
});

// edit/update men fashions
router.put("/editmen/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await mens.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

// WOMEN FASHIONS
//get women fashions
router.get("/getwomens", async (req, res) => {
  try {
    const womensdata = await womens.find();
    res.status(201).json(womensdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get one women fashions
router.get("/getwomensone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const x = await womens.findById({ _id: id });
    res.status(201).json(x);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
});

//add women fashions
router.post("/womensadd", controllers.women);

//delete women fashions
router.delete("/women/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await womens.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
});

// edit/update women fashions
router.put("/editwomen/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await womens.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

//HOME AND KITCHEN
//get home&kitchen
router.get("/gethomekitchens", async (req, res) => {
  try {
    const homekitchensdata = await homekitchens.find();
    res.status(201).json(homekitchensdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//get one home&kitchen
router.get("/gethomekitchensone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const x = await homekitchens.findById({ _id: id });
    res.status(201).json(x);
  } catch (error) {
    res.status(404).json("error" + error.message);
  }
});

//add home&kitchen
router.post("/homekitchenadd", controllers.homekitchen);

//delete home&kitchen
router.delete("/homekitchen/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await homekitchens.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "error" });
  }
});

// edit/update home&kitchen
router.put("/edithomekitchen/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await homekitchens.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

//but items
router.post("/buymail", authenticate, controllers.buymail);

//feedback
router.post("/feedbackData", authenticate, async (req, res) => {
  const { email, feedback } = req.body;
  console.log(email, feedback);
  try {
    if (!email || !feedback) {
      res.status(404).json({ status: 404, message: "Fill all the detail" });
    }
    const data = {
      feedback,
    };

    const Usercontact = await datas.findOne({ _id: req.userId });
    console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const feedbackData = await Usercontact.feedbackdata(data);
      res.status(201).json(feedbackData);

      await Usercontact.save();
      console.log(feedbackData + " thse save wait kr");
      console.log(Usercontact + "userjode save");
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

//buyitems
router.post("/buyitems", authenticate, async (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  try {
    const data = {
      cart,
    };

    const Usercontact = await datas.findOne({ _id: req.userId });
    console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const buyitemdata = await Usercontact.buyitemdata(data);
      res.status(201).json(buyitemdata);

      await Usercontact.save();
      console.log(buyitemdata + " thse save wait kr");
      console.log(Usercontact + "userjode save");
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Data not get" });
  }
});

//send link for forgot password and also check user exist or not
router.post("/passlinksend", controllers.link);

//user veryfiaction for forgot password
router.get("/forgotpassword/:id/:token", controllers.veryfiaction);

//new password
router.post("/:id/:token", controllers.newPass);

module.exports = router;
