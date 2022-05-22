// const axios = require("axios");
// const options = {
//   headers: {
//     "Content-Type": "application/json",
//     "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
//   },
// };

// async function Monitor(imgUrl) {
//   let res;
//   let url =
//     process.env.AZURE_URL +
//     "/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion,headPose,occlusion";
//   await axios.post(url, { url: imgUrl }, options).then(
//     (response) => {
//       // console.log("res", response.data);
//       // console.log(response.data[0].faceAttributes)
//       res = response.data;
//       //console.log(response.data.faceAttributes.emotion)
//     },
//     (error) => {
//       console.log(error.message, error.code);
//     }
//   );
//   return res;
// }

// module.exports = Monitor;

const axios = require("axios");
const options = {
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
  },
};
let l;
let faceWithAttributes = [];
let faces = [];
let identifiedFaces = [];
let foundPersons = [];
let personFound;
async function Monitor(imgUrl) {
  faceWithAttributes = [];
  faces = [];
  identifiedFaces = [];
  foundPersons = [];
  let url = process.env.AZURE_URL + "/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion,headPose,occlusion";
  await axios.post(url, { url: imgUrl }, options).then(
    (response) => {
      //console.log("res", response.data);
      l = Math.min(response.data.length, 10);
      for (let i = 0; i < l; i++) {
        faces.push(response.data[i].faceId);
        faceWithAttributes.push(response.data[i]);
      }
      console.log("faces", faces);
    },
    (error) => {
      console.log(error.message, error.code);
    }
  );

  url = process.env.AZURE_URL + "/identify";

  await axios.post(url, { personGroupId: "1", faceIds: faces }, options).then(
    (response) => {
      //console.log("res", response.data);
      //console.log("candidates", response.data[0].candidates);
      for (let i = 0; i < l; i++) {
        if (response.data[i].candidates.length)
          identifiedFaces.push(response.data[i].candidates[0].personId);
        else identifiedFaces.push([]);
      }
      //detectedperson = response.data[0].candidates[0].personId;
    },
    (error) => {
      console.log("error", error.message);
    }
  );
  faces = [];

  for (let i = 0; i < l; i++) {
    if (identifiedFaces[i] != []) {
      url =
        process.env.AZURE_URL + "/persongroups/1/persons/" + identifiedFaces[i];
      await axios.get(url, options).then(
        (response) => {
          //console.log("res", response.data);
          foundPersons.push(response.data);
        },
        (error) => {
          console.log(error.message, error.code);
        }
      );
    } else {
      foundPersons.push([]);
    }
  }

  return { faceWithAttributes, identifiedFaces, foundPersons };
}

module.exports = Monitor;
