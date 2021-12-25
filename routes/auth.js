const router = require("express").Router();
const AuthHelper = require("../utils/AuthHelper");
const bcrypt = require("bcryptjs");
const ApiToken = require("../models/ApiToken");
const users = require("../models/users");

router.post("/register", async (req, res) => {
  if (!AuthHelper.RegChecker(req.body))
    return res.status(400).send({
      Error: "Bad Request (Request is empty)",
    });

  let hash = AuthHelper.CreateUUID(
    req.body.username.toString() +
      req.body.id.toString() +
      req.body.email.toString()
  );

  const userExist = await users.findOne({ UserUUID: hash });
  if (userExist) return res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newuser = new users({
    UserUUID: hash,
    UserName: req.body.username.toString(),
    UserEmail: req.body.email.toString(),
    ID: req.body.id.toString(),
    Password: hashPassword,
    UserStatus: req.body.status.toString(),
  });

  try {
    const savedUser = await newuser.save();
    const apitokenHash = await bcrypt.hash(hash, salt);
    const apitoken = new ApiToken({
      UserUUID: hash,
      ApiToken: apitokenHash,
    });
    const SaveApiToken = await apitoken.save();
    res.send({ UserUUID: hash, ApiToken: apitokenHash });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  if (!AuthHelper.LogChecker(req.body))
    return res.status(400).send({
      Error: "Bad Request (Request is empty)",
    });

  const user = await users.findOne({ UserUUID: req.body.UserUUID });
  if (!user) return res.status(400).send("Email or Password is wrong");
  const vaildpass = await bcrypt.compare(
    req.body.password.toString(),
    user.Password.toString()
  );
  if (!vaildpass) return res.status(400).send("Wrong password");

  const hasapitoken = await ApiToken.findOneAndDelete({
    UserUUID: req.body.UserUUID,
  });

  const salt = await bcrypt.genSalt(10);
  const apitokenHash = await bcrypt.hash(user.UserUUID, salt);

  try {
    const apitoken = new ApiToken({
      UserUUID: user.UserUUID,
      ApiToken: apitokenHash,
    });
    const SaveApiToken = await apitoken.save();

    res.status(200).send({
      ApiToken: apitokenHash,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
