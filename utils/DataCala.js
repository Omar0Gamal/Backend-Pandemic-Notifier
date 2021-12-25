const cordsDB = require("../models/cords");
const usersDB = require("../models/users");

module.exports = {
  async process() {
    let cords = await cordsDB.find({});
    for (let i1 in cords) {
      for (let i2 in cords) {
        if (cords[i1].UserUUID == cords[i2].UserUUID) continue;
        if (
          Math.abs(cords[i1].lat - cords[i2].lat)
            .toString()
            .slice(0, 7) <= 0.00002 &&
          Math.abs(cords[i1].long - cords[i2].long)
            .toString()
            .slice(0, 7) <= 0.00002
        ) {
          let time1 = cords[i1].time.split(":");
          let time2 = cords[i2].time.split(":");

          /* let date1 = new Date(
            Date.UTC(time1[0], time1[1], time1[2], time1[3], time1[4], time1[5])
          );
          let date2 = new Date(
            Date.UTC(time2[0], time2[1], time2[2], time2[3], time2[4], time2[5])
          );
          if (Math.abs(date1.getTime() - date2.getTime()) / 60000 <= 5) {
            */
          try {
            const user1 = await usersDB.findOne({
              UserUUID: cords[i1].UserUUID,
            });
            const user2 = await usersDB.findOne({
              UserUUID: cords[i2].UserUUID,
            });
            const status2 = await user2.get("UserStatus", String);
            const status1 = await user1.get("UserStatus", String);
            switch (status1) {
              case "Infected":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i2].UserUUID,
                  },
                  {
                    UserStatus: "Infected",
                  }
                );
                break;
              case "Safe":
                break;
              case "High":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i2].UserUUID,
                  },
                  {
                    UserStatus: "High",
                  }
                );
                break;
              case "Low":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i2].UserUUID,
                  },
                  {
                    UserStatus: "Low",
                  }
                );
                break;
            }
            switch (status2) {
              case "Infected":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i1].UserUUID,
                  },
                  {
                    UserStatus: "Infected",
                  }
                );
                break;
              case "Safe":
                break;
              case "High":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i1].UserUUID,
                  },
                  {
                    UserStatus: "High",
                  }
                );
                break;
              case "Low":
                await usersDB.updateOne(
                  {
                    UserUUID: cords[i1].UserUUID,
                  },
                  {
                    UserStatus: "Low",
                  }
                );
                break;
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  },
};
