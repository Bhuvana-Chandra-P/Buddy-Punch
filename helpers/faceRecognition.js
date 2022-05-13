const axios = require("axios");
const options = {
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
  },
};
let personID;
async function AddFace(rollNo, imgUrl) {
  let url = process.env.AZURE_URL + "/persongroups/1";
  console.log(url);
  await axios.get(url, options).then(
    (response) => {
      console.log("res", response.data);
    },
    (error) => {
      console.log(error.message, error.code);
    }
  );

  url = process.env.AZURE_URL + "/persongroups/1/persons";
  await axios.post(url, { name: rollNo }, options).then(
    (response) => {
      console.log("res", response.data);
      personID = response.data.personId;
    },
    (error) => {
      console.log(error.message);
    }
  );

  url =
    process.env.AZURE_URL +
    "/persongroups/1/persons/" +
    personID +
    "/persistedFaces";
  await axios.post(url, { url: imgUrl }, options).then(
    (response) => {
      console.log("res", response.data);
      //personID = response.data.personId;
    },
    (error) => {
      console.log(error.message);
    }
  );

  url = process.env.AZURE_URL + "/persongroups/1/persons";
  await axios.get(url, options).then(
    (response) => {
      console.log("res", response.data);
    },
    (error) => {
      console.log(error.message, error.code);
    }
  );

  url = process.env.AZURE_URL + "/persongroups/1/train";
  await axios.post(url, {}, options).then(
    (response) => {
      console.log("res", response.data);
      return response.data; //personID = response.data.personId;
    },
    (error) => {
      console.log(error);
    }
  );
  return "success";
}

module.exports = AddFace;
