const mobile = require("../model/data/mobileShcema");
const MobileData = require("../constant/Mobiledata");

const Mdata = async () => {
  try {
    await mobile.deleteMany({});
    const storeMdata = await mobile.insertMany(MobileData);
    // console.log(storeMdata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = Mdata;
