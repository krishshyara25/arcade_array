const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.verifyAuth0Token = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const auth0Domain = `https://${process.env.AUTH0_DOMAIN}/`;
    const response = await axios.get(`${auth0Domain}.well-known/jwks.json`);
    const keys = response.data.keys[0];
    const publicKey = keys.x5c[0];

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Auth0 Token Verification Error:", error);
    return res.status(500).json({ message: "Failed to verify token" });
  }
};
