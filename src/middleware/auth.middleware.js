const jwt = require("jsonwebtoken");

const auth = async function(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the Authorization header as 'Bearer <token>'
    if (!token) {
      return res.status(403).json({
        message: 'No token provided!',
      });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Failed to authenticate token!',
        });
      }
      // Token is valid, save the decoded information in the request object for use in other middleware or routes
      req.user = decoded;
      next();
    });
  }

  module.exports = {
    auth,
  };