const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Jwt
    // Compare token receved and compare to continue
    // See P6 update (!important)
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    next();
  } catch (error) {
    res.status(401).json({ error: error | "Bad request" });
  }
};
