const crypto = require("crypto");

module.exports = {
  CreateUUID(body) {
    let shasumUUID = crypto.createHash("sha1");
    shasumUUID.update(body + "");
    let hash = shasumUUID.digest("hex").toString();
    return hash;
  },
  RegChecker(body) {
    if (
      body.id != "" &&
      body.username != "" &&
      body.email != "" &&
      body.password != "" &&
      body.status != ""
    ) {
      return true;
    } else {
      return false;
    }
  },
  LogChecker(body) {
    if (body.UserUUID != "" && body.password != "") {
      return true;
    } else {
      return false;
    }
  },
};
