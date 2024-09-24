const electronics = require("../model/data/electronicShcema");
const ElectronicsData = require("../constant/Electronicsdata")

const Edata = async () => {
  try {
    await electronics.deleteMany({});
    const storeEdata = await electronics.insertMany(ElectronicsData);
    // console.log(storeEdata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = Edata;
