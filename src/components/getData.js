const axios = require("axios");

export const getData = (count) => {
  return new Promise(async (res, rej) => {
    try {
      const data = await axios.get(
        `https://randomuser.me/api/?results=${count}`
      );

      const newData = data["data"]["results"];
      let modData = [];
      newData.forEach((element) => {
        modData.push({
          name: element["name"],
          gender: element["gender"],
          email: element["email"],
          picture: element["picture"]["thumbnail"],
        });
      });
      console.log(modData);
      res(modData);
    } catch (er) {
      rej(er);
    }
  });
};

export const searchName = (name, data) => {
  let newData = [];
  name = name.toLowerCase();

  data.forEach((value) => {
    let dataName = `${value["name"]["title"]} ${value["name"]["first"]} ${value["name"]["last"]}`;
    dataName = dataName.toLowerCase();
    if (dataName.includes(name)) newData.push(value);
  });

  return newData;
};

export const searchGender = (gender, data) => {
  let newData = [];
  gender = gender.toLowerCase();
  data.forEach((value) => {
    let temp = value["gender"].toLowerCase();
    if (temp.includes(gender)) newData.push(value);
  });

  return newData;
};

export const searchEmail = (email, data) => {
  let newData = [];
  email = email.toLowerCase();
  data.forEach((value) => {
    let temp = value["email"].toLowerCase();
    if (temp.includes(email)) newData.push(value);
  });

  return newData;
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

export const generateExcel = (data) => {
  data.forEach((element) => {
    const temp = `${element["name"]["title"]} ${element["name"]["first"]} ${element["name"]["last"]}`;
    element["name"] = temp;
  });
  const headers = [
    { label: "Name", key: "name" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Picture", key: "picture" },
  ];
  const csvReport = {
    filename: "Users.csv",
    headers: headers,
    data: data,
  };
  return csvReport;
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
