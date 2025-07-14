
const auth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === "your-secret-api-key") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = auth;

