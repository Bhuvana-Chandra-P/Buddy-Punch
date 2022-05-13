require("dotenv").config({ path: "./env/.env" });
const jwt = require("jsonwebtoken");

// verifies the jwt
const verifyJWT = (req, res, next) => {
  try {
    const { auth_token } = req.headers;
    if (!auth_token) {
      return res.status(401).json({
        message: "No token",
      });
    }
    jwt.verify(auth_token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({
          message: "Invalid token or token expired",
        });
      }
      req.jwt_payload = decoded;

      return next();
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = { verifyJWT };
