const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authToken.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);

  next();
};
module.exports = { verifyToken };
