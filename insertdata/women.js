const women = require("../model/data/womensSchema");
const Womendata = require("../constant/Womendata");

const womendata = async () => {
  try {
    await women.deleteMany({});
    const storewomendata = await women.insertMany(Womendata);
    // console.log(storewomendata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = womendata;
