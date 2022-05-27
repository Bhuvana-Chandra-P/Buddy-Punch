const axios = require("axios");
const options = {
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
  },
};

async function IdentifyFace(imgUrl) {
  let faceID;
  let faces = [];
  let personFound;
  let detectedperson;
  console.log("pf",personFound);
  let url = process.env.AZURE_URL + "/detect";
  await axios.post(url, { url: imgUrl }, options).then(
    (response) => {
      //console.log("res", response.data);
      if (response.data.length) faceID = response.data[0].faceId;
    },
    (error) => {
      console.log("detect " ,error.message, error.code);
      return faceID;
    }
  );

  if (faceID) {
    console.log(faceID);
    url = process.env.AZURE_URL + "/identify";
    faces.push(faceID);

    await axios.post(url, { personGroupId: "1", faceIds: faces }, options).then(
      (response) => {
        //console.log("res", response.data);
        console.log("candidates", response.data[0].candidates);
        //if(response.data[0].candidates[0].confidence > 0.8)
        detectedperson = response.data[0].candidates[0].personId;
      },
      (error) => {
        console.log("error", error.message);
        return faceID;
      }
    );
    faces = [];
    faceID = undefined;
    personFound = undefined;
    if (detectedperson) {
      url = process.env.AZURE_URL + "/persongroups/1/persons/" + detectedperson;
      await axios.get(url, options).then(
        (response) => {
          //console.log("res", response.data);
          detectedperson = undefined;
          personFound = response.data;
        },
        (error) => {
          console.log("detect person" ,error.message, error.code);
          return faceID;
        }
      );
    }
  }

  return personFound;
}

module.exports = IdentifyFace;
