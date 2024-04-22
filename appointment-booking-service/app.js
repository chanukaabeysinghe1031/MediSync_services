const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const dataRoutes = require("./routes/routes");
const { sendEmail } = require("./utils/sendGmail");

app.use(express.json());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/book-appointment", (req, res) => {
  const { name, email, date } = req.body;

  sendEmail(email);

  res.status(200).send("appointment booked successfully");
});
