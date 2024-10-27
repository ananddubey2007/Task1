// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   // Check if Authorization header is present
//   if (!req.headers.authorization) {
//     return res.status(403).json({
//       success: false,
//       message: "Authorization header is missing",
//       errorMessage: "Authorization key must be added in header",
//     });
//   }

//   const authHeader = req.headers.authorization;

//   // Verify token
//   jwt.verify(authHeader, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to authenticate token",
//       });
//     }
//     // Save the user ID from the token
//     req.userId = decoded.userId;
//     next();
//   });
// };

// export default verifyToken;

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Check if the Authorization header is present and extract the token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Supports "Bearer <token>" format

  if (!token) {
    return res.status(403).json({ 
      success: false, 
      message: "Authorization header is missing" 
    });
  }

  try {
    // Verify the token using the SECRET_KEY
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Store the decoded token payload in req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid or expired tokens
    res.status(403).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};

export default verifyToken;
// Compare this snippet from leaderboard/src/controllers/user.controller.js:
