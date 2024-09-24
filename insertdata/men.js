const men = require("../model/data/mensShcema");
const MenData = require("../constant/Mendata");

const Mendata = async () => {
  try {
    await men.deleteMany({});
    const storeMendata = await men.insertMany(MenData);
    // console.log(storeMendata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = Mendata;
