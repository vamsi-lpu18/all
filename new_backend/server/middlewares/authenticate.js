const jwt = require("jsonwebtoken");
module.exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const authenticate = jwt.verify(token, process.env.SECRET_KEY);
    if (!authenticate) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = authenticate;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
