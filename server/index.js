const PORT = 8000;
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const { connect } = require("getstream");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "cdrs6vst5auz";
const API_SEC =
  "caxrjxhz8nfc4van45nvry855mgmgdvh6ur7ndgxtfywgx5jxp5pqysxdrhfp63k";
const APP_ID = "1158069";

//sign up
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // username password handling with get stream
    // console.log(username, password);

    const userId = uuidv1();
    const hashPassword = await bcrypt.hash(password, 10);
    const client = connect(API_KEY, API_SEC, APP_ID);
    const token = client.createUserToken(userId);
    res.status(200).json({ username, userId, hashPassword, token });

    // console.log(hashPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.listen(PORT, () => console.log("server running on potr " + PORT));
