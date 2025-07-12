require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

require("./db/conn");
const router = require("./routes/router");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
router(app);

app.listen(port, () => {
  console.log(`connection start on port ${port}`);
});
