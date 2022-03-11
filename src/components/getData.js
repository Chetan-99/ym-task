const axios = require("axios");

export const getData = (count) => {
  return new Promise(async (res, rej) => {
    try {
      const data = await axios.get(
        `https://randomuser.me/api/?results=${count}`
      );
      res(data["data"]["results"]);
    } catch (er) {
      rej(er);
    }
  });
};
