const axios = require("axios");

export const getData = (count) => {
  return new Promise(async (res, rej) => {
    try {
      const data = await axios.get(
        `https://randomuser.me/api/?results=${count}`
      );
      const newData = data["data"]["results"];
      let modData = [];
      newData.map((value) => {
        modData.push({
          name: value["name"],
          gender: value["gender"],
          email: value["email"],
        });
      });
      res(modData);
    } catch (er) {
      rej(er);
    }
  });
};

export const sortDataWithName = (data, order) => {
  data = data.sort(compareFirstName);
  return order ? data.reverse() : data;
};

export const sortDataWithGender = (data, order) => {
  data = data.sort(compareGender);
  return order ? data.reverse() : data;
};

export const sortDataWithEmail = (data, order) => {
  data = data.sort(compareEmail);
  return order ? data.reverse() : data;
};

function compareFirstName(a, b) {
  if (a.name.first < b.name.first) {
    return -1;
  }
  if (a.name.first > b.name.first) {
    return 1;
  }
  return 0;
}

function compareGender(a, b) {
  if (a.gender < b.gender) return -1;
  if (a.gender > b.gender) return 1;
  else return 0;
}

function compareEmail(a, b) {
  if (a.email < b.email) return -1;
  if (a.email > b.email) return 1;
  else return 0;
}
