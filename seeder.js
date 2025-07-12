require("dotenv").config();
require("./db/conn");

const defaultdata = require("./insertdata/default");
const Mdata = require("./insertdata/mobile");
const Edata = require("./insertdata/electronics");
const Mendata = require("./insertdata/men");
const womendata = require("./insertdata/women");
const Homekitchendata = require("./insertdata/homekitchen");

const runSeeder = async () => {
  try {
    await defaultdata();
    await Mdata();
    await Edata();
    await Mendata();
    await womendata();
    await Homekitchendata();

    console.log("Data inserted successfully!");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1); // Exit with failure
  }
};

runSeeder();
