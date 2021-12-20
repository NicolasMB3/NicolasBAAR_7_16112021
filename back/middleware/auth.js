const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Jwt
    // Compare token receved and compare to continue
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    // Fail security need to be update (Before generate token not after, see controllers)
    if (req.body.userId && req.body.userId !== userId) {
      throw "Incorrect user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Bad request" });
  }
};
