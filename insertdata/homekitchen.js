const homekitchen = require("../model/data/home&kitchenShcema");
const HomeKitchenData = require("../constant/Home&kitchendata");

const Homekitchendata = async () => {
    try {
      await homekitchen.deleteMany({});
      const storeMendata = await homekitchen.insertMany(HomeKitchenData);
      // console.log(storeMendata);
    } catch (error) {
      console.log("error" + error.message);
    }
  };
  
  module.exports = Homekitchendata;