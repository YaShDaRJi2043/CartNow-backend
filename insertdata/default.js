const products = require("../model/productsShcema");
const Productdata = require("../constant/Productdata");

const Defaultdata = async () => {
  try {
    await products.deleteMany({});
    const storedata = await products.insertMany(Productdata);
    // console.log(storedata);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = Defaultdata;
