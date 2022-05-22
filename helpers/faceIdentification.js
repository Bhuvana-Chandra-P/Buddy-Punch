const axios = require("axios");
const options = {
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
  },
};
let faceID;
let faces = [];
let personFound;
async function IdentifyFace(imgUrl) {
  let url = process.env.AZURE_URL + "/detect";
  await axios.post(url, { url: imgUrl }, options).then(
    (response) => {
      //console.log("res", response.data);
      if (response.data.length) faceID = response.data[0].faceId;
    },
    (error) => {
      console.log(error.message, error.code);
    }
  );

  if (faceID) {
    url = process.env.AZURE_URL + "/identify";
    faces.push(faceID);

    await axios.post(url, { personGroupId: "1", faceIds: faces }, options).then(
      (response) => {
        //console.log("res", response.data);
        console.log("candidates", response.data[0].candidates);
        detectedperson = response.data[0].candidates[0].personId;
      },
      (error) => {
        console.log("error", error.message);
      }
    );
    faces = [];
    if (detectedperson) {
      url = process.env.AZURE_URL + "/persongroups/1/persons/" + detectedperson;
      await axios.get(url, options).then(
        (response) => {
          //console.log("res", response.data);
          personFound = response.data;
        },
        (error) => {
          console.log(error.message, error.code);
        }
      );
    }
  }

  return personFound;
}

module.exports = IdentifyFace;
