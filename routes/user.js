const router = require("express").Router();
const ApiToken = require("../models/ApiToken");
const users = require("../models/users");
const cords = require("../models/cords");

router.get("/status/:uuid", async (req, res) => {
  const user = await users.findOne({ UserUUID: req.params.uuid });
  res.status(200).send({
    Status: user.UserStatus,
  });
});

router.post("/status", async (req, res) => {
  const token = await ApiToken.findOne({ UserUUID: req.body.UserUUID });
  if (!token) return res.status(400).send({ Error: "Invaild Token" });

  try {
    const user = await users.findOne({ UserUUID: req.body.UserUUID });
    user.UserStatus = req.body.status;
    const saveduser = await user.save();
    res.status(200).send({
      Status: user.UserStatus,
    });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.post("/data", async (req, res) => {
  try {
    const user = await users.findOne({ UserUUID: req.body.UserUUID });
    const cord = new cords({
      UserUUID: req.body.UserUUID,
      long: req.body.Long,
      lat: req.body.lat,
      time: req.body.time,
    });
    const savedcord = await cord.save();
    res.status(200).send("works");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});
module.exports = router;
