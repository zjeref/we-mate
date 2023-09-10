require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const preferenceRoutes = require("./routes/preference-routes");
const chatRoutes = require("./routes/chat-routes");
const Message = require("./model/Message");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/prefer", preferenceRoutes);
app.use("/api/chat", chatRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
